// This is your test secret API key.
import express from "express";
import Stripe from "stripe";
import order from "../model/Order";
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');

const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

const generateRandomOrderId = () => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  const orderId = `ORDER_ID-${randomNumber}`;
  return orderId;
};

router.post("/checkout", async (req, res) => {
  const {
   total,products,customerDetails
  } = req.body;

  const orderId = generateRandomOrderId();

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.productname,
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.CLIENT_URL}/dashboard`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    metadata: {
      orderId: orderId,
      customerName: customerDetails.fullname,
    },
  });

  let insertData = [];

  products.forEach(element => {
    let obj = {
      orderId: generateRandomOrderId(),
      productId:element._id,
      productname:element.productname,
      image:element.image,
      quantity: element.qty,
      customerDetails:customerDetails,
      isPaymentDone:true,
      paymentType:'ONLINE',
      totalPrice:element.qty*element.price
    }

    insertData.push(obj);
  });


  // const orderDetail = new order({
  //   orderId: generateRandomOrderId(),
  //   quantity: products.reduce((total, product) => total + product.qty, 0),
  //   customerDetails:customerDetails,
  //   isPaymentDone:true,
  //   paymentType:'ONLINE'
  // })

  await order.insertMany(insertData);

  // await orderDetail.save();

  res.send({
    result:session,
  });
});

export default router;
