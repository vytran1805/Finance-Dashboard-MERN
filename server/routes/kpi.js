import express from "express";
import KPI from "../models/KPI.js";
// Create a router object
const router = express.Router();

//these are the actual routes while the one in index.js is the entry point for these specific routes
router.get("/kpis", async (req, res) => {
  try {
    // grab data from the database and assign it to kpis
    const kpis = await KPI.find();
    // send our kpis object that we've grabbed from database  to the front-end via a 200 status
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;
