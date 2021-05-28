const express = require("express");
const router = new express.Router();
const Packages = require("../db/model/tourPackages");
const Place = require("../db/model/placeCard");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = new multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images/"));
  },
  filname: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.post("/package", async (req, res) => {
  const upload = multer({ storage }).any("avatar");
  await upload(req, res, async function (err) {
    if (err) {
      return res.status(400).send("Error", err);
    }
    try {
      var avatar_array = [];
      if (req.files) {
        req.files.forEach((file) => {
          let img = fs.readFileSync(file.path);
          encode_image = img.toString("base64");
          avatar_array.push(encode_image);
        });
      }
      const place_id = req.body.id;
      const package = new Packages({
        title: req.body.title,
        food: req.body.food,
        adventures: req.body.adventures,
        price: req.body.price,
        hotelCategory: req.body.hotelCategory,
        days: req.body.days,
        avatar: avatar_array,
        description: req.body.description,
      });
      await package.save();
      const place = await Place.findById(place_id);

      await place.updateOne({
        $addToSet: {
          packages: package._id,
        },
      });
      res.status(201).send(package);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
});

//Rating
router.post("/rating", auth, async (req, res) => {
  console.log("rating");
  const id = req.body.id;
  const name = req.user.name;
  const rating = req.body.rating;
  const package = await Packages.findById(id);
  const updatedRating = package.rating.concat({ name, rating });

  await package.updateOne({ rating: updatedRating });
  res.send("Rating Successfully Done");
});

router.patch("/update", async (req, res) => {
  const id = req.body.id;
  await Packages.findByIdAndUpdate(id, {
    title: req.body.values.title,
    price: req.body.values.price,
    days: req.body.values.days,
    hotelCategory: req.body.values.hotelCategory,
    food: req.body.values.food,
    adventures: req.body.values.adventures,
  });

  res.send("Updated Package");
});

//Read Packages
router.get("/packages/:id", async (req, res) => {
  const id = req.params.id;
  const list = [];

  Place.findById(id)
    .populate("packages")
    .exec(function (err, result) {
      if (err) return res.send("something went Wrong with packages");

      result.packages.forEach((e) => {
        if (e.show === true) {
          list.push(e);
        }
      });

      res.send(list);
    });
});

//retrieving one  package

router.get("/package/:id", async (req, res) => {
  try {
    const package = await Packages.findById(req.params.id);
    if (!package) {
      return res.status(400).send("No Package");
    }
    const place = await Place.findOne({ packages: { $in: [req.params.id] } });
    const response = package.toObject();
    res.send(response);
  } catch {
    res.status(500).send("Internal server error");
  }
});
router.delete("/package", async (req, res) => {
  try {
    var newPackage = [];
    req.body.checkedItem.forEach(async (id) => {
      const package = await Packages.findByIdAndDelete(id);

      const place = await Place.findOne({ packages: { $in: [id] } });

      place.packages.forEach((e) => {
        if (e != id) {
          newPackage.push(e);
        }
      });
      await Place.findByIdAndUpdate(place._id, {
        packages: newPackage,
      });
    });

    console.log("done");
    res.send("Done");
    // if (!package) {
    //   return res.status(400).send("No Package");
    // }
    //
    // const response = package.toObject();
    // res.send(response);
  } catch (error) {
    console.log("Eerrrrrr", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
