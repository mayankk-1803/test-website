import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";

import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();


/* =========================
   PERFORMANCE: compression
========================= */
app.use(compression());


/* =========================
   CORS CONFIG
========================= */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }

    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


/* =========================
   BODY PARSER
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* =========================
   MongoDB CONNECTION (OPTIMIZED)
========================= */

mongoose.connect(process.env.MONGO_URI, {

  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,

})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB error:", err));


/* =========================
   WARMUP ROUTE (VERY IMPORTANT)
========================= */

app.get("/api/warmup", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server warm"
  });
});


/* =========================
   ROUTES
========================= */

app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/chat", chatRoutes);


/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully"
  });
});


/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

});


/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
