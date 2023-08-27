import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    likes: {
      type: "number",
      default: 0,
      user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    },
    share: {
      type: "number",
      default: 0,
    },
    dislikes:{
      type: "number",
      default: 0,
    },
    comments: [
      {
        comment_text: {
          type: "string",
          required: true,
          user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
          },
        },
        dateTime: { type: Date, default: Date.now },
      },
    ],
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    }
    
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
