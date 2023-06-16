import mongoose from "mongoose";
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  }
});

productSchema.plugin(mongoosePaginate);
const product = mongoose.model("product", productSchema);
export default product;
