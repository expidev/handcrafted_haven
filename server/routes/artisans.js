const express = require("express");
const router = express.Router();
const Artisan = require("../models/Artisan");

router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => 
{
  try {
    const { name, specialty, bio } = req.body;
    const newArtisan = new Artisan({ name, specialty, bio });
    await newArtisan.save();
    res.status(201).json(newArtisan);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

module.exports = router;
