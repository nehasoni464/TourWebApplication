const express = require("express");
const router = new express.Router();
const Place = require("../db/model/placeCard");
const RegisteredUser = require("../db/model/register");
const Package = require("../db/model/tourPackages");
const sharp = require("sharp");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const adminAuth = require("../middleware/adminAuth");

const storage = new multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images/"));
  },
  filname: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//Create Place
router.post("/place", async (req, res) => {
  const upload = multer({ storage }).single("avatar");

  await upload(req, res, async function (err) {
    if (err) {
      return res.status(400).send("Error", err);
    }
    try {
      const buffer = await sharp(req.file.path).png().toBuffer();
      let img = fs.readFileSync(req.file.path);
      encode_image = img.toString("base64");

      const place = new Place({
        title: req.body.title,
        description: req.body.description,
        season: req.body.season.split(","),
        avatar: encode_image,
      });

      await place.save();
      res.status(201).send(place);
    } catch (e) {
      console.log(e);
    }
  });
});

//Read One Place

router.get("/place/:id", async (req, res) => {
  
  const id = req.params.id;
try
 { const place=await Place.findById(id)
   if(!place){
     return res.send("No Place")
   }
   
   res.send(place)
}
catch(e){
  res.status(500).send(e.message)
}
})




//Update
router.patch("/place/:id", async (req, res) => {
  const id = req.params.id;
  console.log("patching");
  await Place.findByIdAndUpdate(id, {
    description: req.body.description,
    title: req.body.title,
    season: req.body.season,
  });

  res.send("Place");
});

//hidden
router.post("/hidden", adminAuth, async (req, res) => {
  console.log("hiddennnnnnn ");
  const id = req.body.id;
  const showw = !req.body.show;
  if (req.body.price === undefined) {
    await Place.findByIdAndUpdate(id, {
      show: showw,
    });
    res.send("success");
  }
  await Package.findByIdAndUpdate(id, {
    show: showw,
  });
  res.send("success");
});

//hidden post show
router.get("/hidden", adminAuth, async (req, res) => {
  console.log(req.body);
  var list = [];
  var listPackage = [];
  await Place.find({}).then((places) => {
    places.forEach((place) => {
      if (!place.show) {
        list.push(place);
      }
    });
  });
  await Package.find({}).then((packages) => {
    packages.forEach((package) => {
      if (!package.show) {
        listPackage.push(package);
      }
    });
  });
  res.send({ list, listPackage });
});





//Read Place
router.get("/:type", async (req, res) => {
  let place;
  const type = req.params.type;

  if (req.query.search) {
    const expr = new RegExp(req.query.search);

    place = await Place.find({
      season: { $in: [type] },
      show: true,
      title: { $regex: expr, $options: "i" },
    });

    return res.send(place);
  }

  if (req.query.sortBy === "alphabetically") {
    place = await Place.find({ season: { $in: [type] }, show: true }).sort({
      title: 1,
    });
  } else if (req.query.sortBy === "recent") {
    place = await Place.find({ season: { $in: [type] }, show: true }).sort({
      createdAt: -1,
    });
  } else {
    place = await Place.find({ season: { $in: [type] }, show: true });
  }
  res.send(place);
});






//registered user
router.post("/register", async (req, res) => {
  const user = new RegisteredUser(req.body.values);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
