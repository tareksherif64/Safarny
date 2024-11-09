const mongoose = require("mongoose");

const Posts = new mongoose.Schema(
  {
    details: String,
    price: Number,
    currency: String,
    quantity: Number,
      purchasedCount: Number,
    imageurl: String,
    reviews: {
      type: [String],
      default: [], // Set initial value to an empty array
    },
    reviews: [String],
    
    purchased: {
      type: Boolean,
      default: false, // Set initial value to false
    },

    archived: {
      type: Boolean,
      default: false, // Set initial value to false
    },
    rating: {
      type: Number,
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
      default: 1, // Set initial value to 1
    },
    createdby:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    collection: "Posts",
  }
);

const Post = mongoose.model("Posts", Posts);
module.exports = Post;
