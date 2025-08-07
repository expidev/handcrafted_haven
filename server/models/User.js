const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    isSeller: {
      type: Boolean,
      default: false,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product',  }],
    artisanDetails: {
      bio: {
        type: String,
        default: "",
      },
      speciality: {
        type: String,
        default: "",
      },
      region: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
      category: {
        type: String,
        default: "",
      }
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
