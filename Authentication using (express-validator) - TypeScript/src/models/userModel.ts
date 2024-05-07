import mongoose from "mongoose";

// create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Chats",
    },
  ],
});

// export userSchema
export default mongoose.model("User", userSchema);
