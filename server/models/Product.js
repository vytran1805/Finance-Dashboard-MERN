/*********************************************************************************
 * This file helps set up a model that will make it easy to call our database    *
 * and grab  information using mongoose                                          *
 *********************************************************************************/
import mongoose from "mongoose";
import { loadType } from "mongoose-currency"; //set up currency types

const Schema = mongoose.Schema;
loadType(mongoose);

/**
 * Create a monthly Schema to track the monthly data
 * Every day, we will have Revenue, Expenses, Operational expenses and Non-operational expenses
 */
const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "CAD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "CAD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } } //this is the setting so that we can use the 'get' above to grab our currencies
);
/**
 * Create a monthly Schema to track the monthly data
 * Every month, we will have Revenue, Expenses, Operational expenses and Non-operational expenses
 */
const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    expenses: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    operationalExpense: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
  },
  { toJSON: { getters: true } } //this is the setting so that we can use the 'get' above to grab our currencies
);
/**
 * This will create our model
 * Note: need to provide the same info that
 * we were looking at when it came to the MODEL STRUCTURES
 */
const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    expense: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    // this keeps track of all the transaction IDs relevant to the product
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction", //this is refering to each Transaction object that's relevant to the particular product  
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

// boilerplate
const Product = mongoose.model("Product", ProductSchema);

export default Product;
