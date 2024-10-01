import mongoose, { Schema, models } from "mongoose";

const ActionSchema = new Schema(
  {
    uid: String,
    action: String,
  },
  {
    timestamps: true,
  }
);

const Action = models.Action || mongoose.model("Action", ActionSchema, "Actions");

export default Action;
