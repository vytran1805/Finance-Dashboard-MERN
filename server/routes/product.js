import express from "express";
import Product from "../models/Product.js";
// Create a router object
const router = express.Router();

//these are the actual routes while the one in index.js is the entry point for these specific routes
router.get("/products", async (req, res) => {
  try {
    // grab data from the database and assign it to kpis
    const products = await Product.find();
    // send our kpis object that we've grabbed from database  to the front-end via a 200 status
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;