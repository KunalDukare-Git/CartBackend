import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { mongoConnection } from "./db";
import userRoute from './routes/User'
import productRoute from './routes/Product'
import stripeRoute from './routes/Stripe'
import orderRoute from './routes/Orders'

const app = express();
mongoConnection();

app.use(cors({ origin: "*" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/stripe", stripeRoute);
app.use ("/uploads",express.static("Uploads"));


export default app;
