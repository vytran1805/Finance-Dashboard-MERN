import express from "express";
import Transaction from "../models/Transaction.js";
// Create a router object
const router = express.Router();

//these are the actual routes while the one in index.js is the entry point for these specific routes
router.get("/transactions", async (req, res) => {
  try {
    // grab data from the database and assign it to kpis
    const transactions = await Transaction.find()
      .limit(50)  //just show 50 transaction (help with latency, not slow down the server)
      .sort({createdOn:-1});  //sorting by the latest
    /* Any other logic goes here */

    // send our kpis object that we've grabbed from database  to the front-end via a 200 status
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;
