import express from "express";
import Order from "../models/Order.js";
import { sendOrderEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    await sendOrderEmail(savedOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
