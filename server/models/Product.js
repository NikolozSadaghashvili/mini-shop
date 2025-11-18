import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: false,
      default:
        "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

export default Product;
