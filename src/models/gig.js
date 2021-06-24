const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
   title: {
      type: String,
      require: true,
   },
   description: {
      type: String,
      require: true,
   },
   coverImg: {
      type: String,
   },
   studio: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'studio',
   },
},{timestamps: true});

module.exports = mongoose.model('gig', gigSchema);