const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/User");
const validateReq = require("../middleware/validateReq");
const { addProductValidation } = require("../validation/products");
const uploadProduct = require("../middleware/productStorage");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    // Check if Ids are present
    if (req.query.ids) {
      const ids = req.query.ids.split(",");
      const products = await Product.find({ _id: { $in: ids } });
      return res.json(products);
    }

    // Return all
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get featured products with a harcoded limit of +6
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find().limit(6).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET one product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("artisanId", "name");
    if (!product) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// POST new product
router.post("/", verifyToken, uploadProduct.single("image"),
  addProductValidation, validateReq, async (req, res) => {
    try {
      const { title, description, price, category } = req.body;
      const productImage = req.file ? process.env.BASE_URL + '/' + req.file.path : null;
      const product = await Product.create({
        title,
        description,
        price,
        image: productImage,
        category,
        artisanId: req.user.id,
      });

      const user = await User.findById(req.user.id);
      if (!user || !user.isSeller) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      res.status(201).json(product);
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

// PUT (update) product
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, artisanId: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(403).json({ error: "Unauthorized or not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      artisanId: req.user.id,
    });
    if (!deleted) {
      return res.status(403).json({ error: "Unauthorized or not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;