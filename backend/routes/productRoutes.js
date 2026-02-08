import express from "express";
import Product from "../models/Product.js";
import upload from "../utils/multer.js";

const router = express.Router();


// ADD PRODUCT
router.post("/",upload.single("image"), async (req, res) => {
 console.log("body", req.body);
 console.log("file", req.file);
  try {

    const product = new Product({

      name: req.body.name,
      description: req.body.description,
      image: req.file.path

    });

    const response = await product.save();
    // console.log("Product saved successfully:", response);
    

    res.status(201).json(response);
    

  } catch (error) {

   res.status(500).json({ error: error.message });
    console.log(error);
    
  }

});


// GET PRODUCTS
router.get("/", async (req, res) => {
  // console.log("inside get route", req);
  
  const products = await Product.find();
  // console.log(products);
  
  res.json(products);

});


// DELETE PRODUCT
router.delete("/:id", async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });

});


// UPDATE PRODUCT
router.put("/:id", upload.single("image"), async (req, res) => {

  try {

    const { name, description, price } = req.body;

    const updateData = {

      name,
      description,
      price

    };


    // if new image uploaded
    if (req.file) {

      updateData.image = req.file.path;

    }


    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,
        updateData,
        { new: true }

      );


    res.json(updatedProduct);

  }
  catch (error) {

    console.error(error);

    res.status(500).json({

      error: error.message

    });

  }

});


export default router;