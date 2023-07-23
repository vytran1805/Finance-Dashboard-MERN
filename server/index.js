import express, { application } from "express";
import bodyParser from "body-parser"; //handle information that’s coming from the body of a request
import mongoose, { mongo } from "mongoose";
import cors from "cors"; //handle cross origin resource sharing requests so that we can call from different URL
import dotenv from "dotenv"; //handle environment variables
import helmet from "helmet"; //for API endpoint security
import morgan from "morgan"; //handle console log ⇒ anytime we hit an endpoint, it’s going to console log information
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/products.js";
import Product from './models/Product.js'
import KPI from "./models/KPI.js"; //import the KPI model
import { kpis } from "./data/data.js"; //import the data
/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 9000;
mongoose
  // connect to MONGO_URL in .env file
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //then listen to PORT
  .then(async () => {
    app.listen(PORT, () => console.log(`${PORT}`));

    /** DATA HAS ALREADY BEEN INSERTED.
     *  I COMMENTED OUT THAT WE DON'T REACH THE RATE LIMIT*/

    // before we're going to seed our database with information,
    // we drop the current database that we already have

    // await mongoose.connection.db.dropDatabase(); //drop the database if existed
    // KPI.insertMany(kpis); //insert kpis data into the KPI model
  })
  // catch any errors occurs
  .catch((error) => console.log(`${error} did not connect`));
