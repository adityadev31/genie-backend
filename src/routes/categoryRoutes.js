const router = require("express").Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    if (cats) res.status(200).json(cats);
    else res.status(400).json({ msg: "no category found" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// populated GETS

router.get("/withsubcategories", async (req, res) => {
  try {
    return Category.find({})
      .populate("subcategories")
      .exec((err, subcategories) => {
        if (err) return res.status(500).json({ msg: err });
        if (subcategories) return res.status(200).json(subcategories);
        else return res.status(400).json({ msg: "not found error" });
      });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/:name/withsubcategories", async (req, res) => {
  try {
    return Category.find({ title: req.params.name })
      .populate("subcategories")
      .exec((err, subcategories) => {
        if (err) return res.status(500).json({ msg: err });
        if (subcategories) return res.status(200).json(subcategories);
        else return res.status(400).json({ msg: "not found error" });
      });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// normal GET

router.get("/:name", async (req, res) => {
  try {
    const cats = await Category.findOne({ title: req.params.name });
    if (cats) res.status(200).json(cats);
    else res.status(400).json({ msg: "no category found" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/add-category", async (req, res) => {
  try {
    const { title, subtitle, coverImg, croppedImg } = req.body;
    const newCategory = new Category({ title, subtitle, coverImg, croppedImg });
    const savedCat = await newCategory.save();
    if (savedCat) return res.status(200).json(savedCat);
    else return res.status(404).json({ msg: "not found" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/edit-category/:id", async (req, res) => {
  try {
    const updatedData = await Category.findByIdAndUpdate(
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

module.exports = router;
