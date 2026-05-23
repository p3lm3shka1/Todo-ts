import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Todo = model("Todo", todoSchema);

export default Todo;
