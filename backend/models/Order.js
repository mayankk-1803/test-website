import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,

    productId: String,   // FIXED
    productName: String,
    price: Number,

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
