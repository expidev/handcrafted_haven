const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET /api/users/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/me", authMiddleware, async (req, res) => {
  try {
    const { artisanDetails } = req.body;

    if (!artisanDetails || typeof artisanDetails !== "object") {
      return res.status(400).json({ error: "Invalid artisanDetails data" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: artisanDetails.name, artisanDetails },
      { new: true, runValidators: true, select: "artisanDetails" }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error updating me:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
