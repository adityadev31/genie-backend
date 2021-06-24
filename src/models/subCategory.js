const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: true,
   },
   icon: {
      type: String,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
   },
},{timestamps: true});

module.exports = mongoose.model('subcategory', subCategorySchema);