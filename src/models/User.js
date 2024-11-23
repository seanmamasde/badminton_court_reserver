import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const uuidValidator = {
  validator: function (v) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
  },
  message: (props) => `${props.value} is not a valid UUID!`,
};

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    validate: uuidValidator,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // teams: {
  //   type: [String],
  //   default: [],
  //   validate: [uuidValidator, "Invalid UUID in teams array"],
  // },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
