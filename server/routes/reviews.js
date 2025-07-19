const express = require("express");
const Review = require("../models/Review"); 
const Product = require("../models/Product");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.get("/latest", async (req, res) => {
  try {
    // console.log("entered");
    const latestReviews = await Review.find().sort({ createdAt: -1 }).limit(5);
    // console.log(latestReviews);
    res.json(latestReviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch latest reviews" });
  }
});
router.post("/:productId", verifyToken, async (req, res) =>
{
  try
  {
    const { rating, comment } = req.body;

    const existing = await Review.findOne({
      productId: req.params.productId,
      userId: req.user.id
    });

    if (existing) 
    {
        return res.status(409).json({ error: "You already reviewed this product." });
    }

    const review = await Review.create({
      productId: req.params.productId,
      userId: req.user.id,
      rating,
      comment
    });
    const reviews = await Review.find({ productId: req.params.productId });
    const avgRating =reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(req.params.productId, {
      rating: avgRating.toFixed(1)
    });
    res.status(201).json(review);
  }
  catch (err)
  {
    console.error("Review error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:productId", async (req, res) =>
{
  try
  {
    const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "name");
    res.json(reviews);
  }
  catch (err)
  {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
