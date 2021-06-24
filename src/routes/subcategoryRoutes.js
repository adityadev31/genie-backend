const router = require("express").Router();
const Subcategory = require("../models/subCategory");
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const cats = await Subcategory.find();
    if (cats) res.status(200).json(cats);
    else res.status(400).json({ msg: "no Subcategory found" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// populated gets

router.get("/with-category", async (req, res) => {
  try {
    return Subcategory.find()
      .populate("category")
      .exec((err, category) => {
        if (err) return res.status(500).json({ msg: err });
        if (category) return res.status(200).json(category);
        else return res.status(400).json({ msg: "parent category not found" });
      });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/:name/with-category", async (req, res) => {
  try {
    return Subcategory.find({ name: req.params.name })
      .populate("category")
      .exec((err, category) => {
        if (err) return res.status(500).json({ msg: err });
        if (category) return res.status(200).json(category);
        else return res.status(400).json({ msg: "parent category not found" });
      });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// normal GET

router.get("/:name", async (req, res) => {
  try {
    const cats = await Subcategory.findOne({ name: req.params.name });
    if (cats) res.status(200).json(cats);
    else res.status(400).json({ msg: "no Subcategory found" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/add-Subcategory", async (req, res) => {
  try {
    const { name, icon, category } = req.body;
    const newSubcategory = new Subcategory({ name, icon, category });
    const savedCat = await newSubcategory.save();
    if (savedCat) {
      const updatedCategory = await Category.findByIdAndUpdate(
        category,
        { $push: { subcategories: savedCat._id } },
        { new: true }
      );
      if (updatedCategory) return res.status(200).json(savedCat);
      else return res.status(500).json({ msg: "category not updated" });
    } else return res.status(404).json({ msg: "not found" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/edit-Subcategory/:id", async (req, res) => {
  try {
    const updatedData = await Subcategory.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedData) return res.status(200).json(updatedData);
    else return res.status(400).json({ msg: "data not found" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// delete subcategory

module.exports = router;
