const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
  title: 
  { 
    type: String, 
    required: true 
  },
  description: 
  { 
    type: String, 
    required: true 
  },
  price: 
  { 
    type: Number, 
    required: true 
  },
  image: 
  { 
    type: String, 
    default: "/hero.jpg" 
  },
  category: 
  { 
    type: String 
  },
  rating: 
  { 
    type: Number, 
    default: 0 
  },
  artisanId: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, 
{ 
  timestamps: true 
}
);

module.exports = mongoose.model("Product", productSchema);
