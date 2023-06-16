import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  add_line1: {
    type: String,
  },
  add_line2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const user = mongoose.model("user", userSchema);
export default user;
