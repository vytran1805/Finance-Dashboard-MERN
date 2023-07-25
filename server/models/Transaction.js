/*********************************************************************************
 * This file helps set up a model that will make it easy to call our database    *
 * and grab  information using mongoose                                          *
 *********************************************************************************/
import mongoose from "mongoose";
import { loadType } from "mongoose-currency"; //set up currency types

const Schema = mongoose.Schema;
loadType(mongoose);

/**
 * This will create our Transaction model
 * Note: need to provide the same info that
 * we were looking at when it came to the MODEL STRUCTURES
 * Schema structure: buyer, amount, productIds (which products the buyer has bought)
 */
const TransactionSchema = new Schema(
  {
    buyer: {
      type: String, //this is from the loadType we imported above
      require: true,
    },
    amount: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    // this shows the product id that is relevant to this particular transaction
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", //this is refering to the productId
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

// boilerplate
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
