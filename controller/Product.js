import product from "../model/Product";
import mongoose from "mongoose";

/*---------Add Products-------*/
export const addProduct = async (req, res) => {
  try {
    const { productname, price, category } = req.body;
    const productAdd = new product({
      productname,
      price,
      category,
      image: req.file.filename,
    });

    const result = await productAdd.save();
    if (result) {
      res.send({
        status: true,
        message: " Product added Successfull",
        result: result,
      });
    } else {
      res.send({
        status: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("PRODUCT ID==>",productId)
    let deleteProduct = await product.findOneAndDelete({ _id: productId });

    if (deleteProduct) {
      res.send({
        status: true,
        message: "Product Deleted",
      });
    } else {
      res.send({
        status: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    throw err;
  }
};

/*---------Get Products-------*/
export const getProducts = async (req, res) => {
  try {
    const result = await product.find();
    for (let key in result) {
      result[key].image = `http://localhost:9090/uploads/${result[key].image}`;
    }
    if (result) {
      res.send({ status: true, result: result });
    }
  } catch (e) {
    throw e;
  }
};

/*-------------Update Products------------*/
export const updateProduct = async (req, res) => {
  try {
    let data = {};
    if (req.body.productname) {
      data.productname = req.body.productname;
    }
    if (req.body.price) {
      data.price = req.body.price;
    }

    if (req?.file?.filename) {
      data.image = req?.file?.filename;
    }

    const result = await product.findOneAndUpdate(
      { _id: req.body.productId },
      { $set: data },
      { new: true }
    );

    console.log("RESULT==>",result);

    if (!result) {
      res.send({
        status: false,
        statusCode: 400,
        message: `Updation Failed!!
Something went wrong`,
        result: result,
      });
    } else {
      res.send({
        status: true,
        statusCode: 200,
        message: "Successfully Updated",
        result: result,
      });
    }
  } catch (e) {
    throw e;
  }
};

/*--------------Multiple Delete------------*/
export const deleteMultiple = async (req, res) => {
  try {
    let { id_array } = req.body;
    const response = await product.deleteMany({ _id: { $in: id_array } });

    if (response.deletedCount > 0) {
      res.send({
        status: true,
        message: "Deleted successfully",
        result: response,
      });
    }
  } catch (e) {
    throw e;
  }
};


