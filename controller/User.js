import user from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      city,
      state,
      add_line1,
      add_line2,
      mobile,
      email,
    } = req.body;

    const isUserExist = await user.findOne({ email:email });

    if(isUserExist){
      res.send({
        status: false,
        message: "User already exist with this email!!",
        result: null,
      });
    }else{
      const addUser = new user({
        first_name,
        last_name,
        city,
        state,
        add_line1,
        add_line2,
        mobile,
        email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
  
      const result = await addUser.save();
      res.send({
        status: true,
        message: " Registered Successfully",
        result: result,
      });
    }

   
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await user.findOne({ email });

  if (!result) {
    res.send({
      status: false,
      message: "Email is Incorrect!!!",
    });
  }

  const isValid = bcrypt.compareSync(password, result.password);

  if (isValid) {
    let payload = {};
    payload._id = result._id;

    jwt.sign(
      payload,
      "SECRET_KEY",
      {
        expiresIn: "24h",
      },
      (err, token) => {
        res.send({
          Token: token,
          status: true,
          statusCode: 200,
          message: " Login Success",
          result: result,
        });
      }
    );
  } else {
    res.send({ status: false, message: "Password is incorrect" });
  }
};

