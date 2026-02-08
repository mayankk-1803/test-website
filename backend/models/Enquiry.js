import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    //FIX: make optional
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
      default: null
    },

    // required because always exists
    productName: {
      type: String,
      required: true,
      default: "General Enquiry"
    }

  },
  {
    timestamps: true
  }
);

export default mongoose.model("Enquiry", enquirySchema);
