const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema(
{
  name: 
  { 
    type: String, 
    required: true 
  },
  specialty: 
  { 
    type: String, 
    required: true 
  },
  bio: 
  { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model("Artisan", artisanSchema);
