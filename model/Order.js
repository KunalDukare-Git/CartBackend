import mongoose from "mongoose";
const mongoosePaginate = require('mongoose-paginate-v2')

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  productId: {
    type: String,
  },
  productname: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  },
  customerDetails:{
    type:Object
  }
  ,
  isPaymentDone:{
    type:Boolean,
    default:false
  },
  paymentType:{
    type:String,
    anum:['ONLINE','COD']
  },
  totalPrice:{
    type:String
  },
  status:{
    type:String,
    default:'Pending',
    enum:['Pending','Proccessing','Shipped','Delivered']
  },
  isFullFilled:{
    type:Boolean,
    default:false,
    
  }
});

orderSchema.plugin(mongoosePaginate);
const order = mongoose.model("order", orderSchema);
export default order;
