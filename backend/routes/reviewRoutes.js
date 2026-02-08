import express from "express";
import Review from "../models/Review.js";

const router = express.Router();


// CREATE REVIEW
router.post("/", async (req, res) => {

  try {

    const { name, review, rating } = req.body;

    const newReview = new Review({
      name,
      review,
      rating
    });

    await newReview.save();

    res.status(201).json(newReview);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// GET ALL REVIEWS
router.get("/", async (req, res) => {

  try {

    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;
