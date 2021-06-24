// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const DBURL = process.env.DBURL;
const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());   // accept request as json
app.use(express.urlencoded({extended: true}));  // accept request as arrays and strings

// db connection
mongoose
.connect(DBURL, {useCreateIndex:true, useFindAndModify:false, useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log('DB connected successfully'))
.catch(err => console.log('db not connected'));

// import routes
const catRoutes = require('./src/routes/categoryRoutes');
const subcatRoutes = require('./src/routes/subcategoryRoutes');

// use routes
app.use('/category', catRoutes);
app.use('/subcategory', subcatRoutes);

// server start
app.listen(PORT, () => {
   console.log(`server running on PORT ${PORT}`);
})