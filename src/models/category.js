const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
   title: {
      type: String,
      require: true,
      unique: true,
   },
   subtitle: {
      type: String,
      require: true,
   },
   coverImg: {
      type: String,
   },
   croppedImg: {
      type: String,
   },
   subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subcategory',
   }],
},{timestamps: true});

module.exports = mongoose.model('category', CategorySchema);