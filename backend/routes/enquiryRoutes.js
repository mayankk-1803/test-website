import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();


// CREATE ENQUIRY
router.post("/", async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      message,
      productId,
      productName
    } = req.body;

    const enquiry = new Enquiry({

      name,
      email,
      phone,
      message,

      productId: productId || null,

      productName:
        productName || "General Enquiry"

    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry saved"
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});


// GET ENQUIRIES
router.get("/", async (req, res) => {

  try {

    const enquiries =
      await Enquiry
        .find()
        .sort({ createdAt: -1 });

    res.json(enquiries);

  }
  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// DELETE ENQUIRY
router.delete("/:id", async (req, res) => {

  try {

    await Enquiry.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted successfully"
    });

  }
  catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


export default router;
