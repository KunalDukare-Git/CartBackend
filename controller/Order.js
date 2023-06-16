import order from "../model/Order";

export const getOrders = async (req, res) => {
    try {
      const result = await order.find();

      if (result) {
        res.send({ status: true, result: result });
      }
    } catch (e) {
      throw e;
    }
  };

  export const updateOrder = async (req, res) => {
    try {
      const {orderId,status,isFullFilled} = req.body;
      var obj ={}

      if(status == undefined){
        obj = {isFullFilled}
      }else{
        obj={status}
      }

      const result = await order.findOneAndUpdate(
        { _id: orderId },
        { $set: obj },
        { new: true }
      );
  
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