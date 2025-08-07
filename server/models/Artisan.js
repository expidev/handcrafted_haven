const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  speciality: {
    type: String,
    default: "",
  },
  bio: {
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
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // references Product model
    },
  ],
});

module.exports = mongoose.model("Artisan", artisanSchema);
