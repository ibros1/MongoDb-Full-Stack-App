import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
