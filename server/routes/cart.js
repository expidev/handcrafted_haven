const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Search user's cart
router.get("/", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.json(cart || { userId: req.user.id, items: [] });
});

// Add cart item
router.post("/add", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user.id,
      items: [{ productId, quantity }]
    });
  } else {
    const index = cart.items.findIndex((item) => item.productId.equals(productId));
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.status(200).json(updatedCart);
});

// Update cart quantity
router.post("/update", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const item = cart.items.find((i) => i.productId.equals(productId));
  if (!item) return res.status(404).json({ error: "Item not in cart" });

  item.quantity = quantity;
  await cart.save();

  const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.json(updatedCart);
});

// Remove cart quantity
router.post("/remove", verifyToken, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  cart.items = cart.items.filter((item) => !item.productId.equals(productId));
  await cart.save();

  const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.json(updatedCart);
});

// Clear cart items
router.delete("/clear", verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;
