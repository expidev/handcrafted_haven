const express = require("express");
const router = express.Router();
const Artisan = require("../models/Artisan");
const User = require("../models/User");
const Product = require("../models/Product");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const validateReq = require("../middleware/validateReq");
const { updateArtisanValidation } = require("../validation/artisans");

router.get("/", async (req, res) => {
  const filter = {
    isSeller: true,
    name: new RegExp(req.query.name, "i"),
    "artisanDetails.category": new RegExp(req.query.category, "i"),
    "artisanDetails.region": new RegExp(req.query.region),
  };

  try {
    const sellers = await User.find({ ...filter });
    const artisans = sellers.map(
      (seller) =>
        new Artisan({
          _id: seller._id,
          name: seller.name,
          ...seller.artisanDetails,
        }),
    );

    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, specialty, bio } = req.body;
    const newArtisan = new Artisan({ name, specialty, bio });
    await newArtisan.save();
    res.status(201).json(newArtisan);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Update artisan details
router.put("/:id", verifyToken, upload.single("profile"), updateArtisanValidation, validateReq, async (req, res) => {
  try {
    const { name, bio, speciality } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const updateData = {
      name,
      "artisanDetails.bio": bio,
      "artisanDetails.speciality": speciality,
      "artisanDetails.category": "",
      "artisanDetails.region": "",
    };

    if (profileImage) {
      updateData["artisanDetails.image"] = process.env.BASE_URL + '/' + profileImage;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!user || !user.isSeller) {
      return res.status(404).json({ error: "Artisan not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error updating artisan:", err);
    res.status(400).json({ error: "Invalid data" });
  }
});

// GET one artisan by ID
router.get("/:id", async (req, res) => {
  try {
    const seller = await User.findOne({
      _id: req.params.id,
      isSeller: true,
    }).lean();
    if (!seller) {
      return res.status(404).json({ error: "Not found" });
    }

    const products = await Product.find({ artisanId: seller._id });

    const artisan = new Artisan({
      ...seller.artisanDetails,
      name: seller.name,
      products,
    });

    res.json(artisan);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

module.exports = router;
