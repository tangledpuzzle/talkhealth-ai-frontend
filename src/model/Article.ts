import mongoose, { Schema, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    cover: String,
    author: String,
    rating: Number,
    category: String,
    slug: String,
    views: Number,
  },
  {
    timestamps: true,
  }
);

const PostModel = models.Post || mongoose.model("Post", PostSchema);

export default PostModel;
