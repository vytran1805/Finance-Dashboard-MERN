import express, { application } from "express";
import bodyParser from "body-parser"; //handle information that’s coming from the body of a request
import mongoose from "mongoose";
import cors from "cors"; //handle cross origin resource sharing requests so that we can call from different URL
import dotenv from "dotenv"; //handle environment variables
import helmet from "helmet"; //for API endpoint security
import morgan from "morgan"; //handle console log ⇒ anytime we hit an endpoint, it’s going to console log information

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

/*MONGOOSE SETUP*/
