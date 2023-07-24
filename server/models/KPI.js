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
    operationalExpenses: {
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
const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    totalRevenue: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    totalExpenses: {
      type: mongoose.Types.Currency, //this is from the loadType we imported above
      currency: "CAD",
      get: (v) => v / 100, //divide the value to get the real currency value
    },
    //this is an obj => different from the other 3 above
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: "CAD",
        get: (v) => v / 100, //divide the value to get the real currency value
      },
    },
    dailyData: {
      type: Map,
      of: {
        currency: "CAD",
        get: (v) => v / 100, //divide the value to get the real currency value
      },
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } }
);

// boilerplate
const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
