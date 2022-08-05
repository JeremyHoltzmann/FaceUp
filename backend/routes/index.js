var request = require("sync-request");
var express = require("express");
var router = express.Router();

var uniqid = require("uniqid");
const fs = require("fs");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkouy4jgl",
  api_key: "478929779786747",
  api_secret: "vOgxjWoTGzlkFLlMU25HTexJqNQ",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", async function (req, res, next) {
  var imagePath = "tmp/" + uniqid() + ".jpg";
  var resultCopy = await req.files.photo.mv(imagePath);

  if (!resultCopy) {
    {
      var resultCloudinary = await cloudinary.uploader.upload(imagePath);

      var options = {
        json: {
          apiKey: "5c0a5d392c1745d2ae84dc0b1483bfd2",
          image: resultCloudinary.url,
        },
      };
      console.log("🚀 ~ file: index.js ~ line 40 ~ options", options);

      var resultDetectionRaw = await request(
        "POST",
        "https://lacapsule-faceapi.herokuapp.com/api/detect",
        options
      );

      var resultDetection = await resultDetectionRaw.body;
      resultDetection = await JSON.parse(resultDetection);
      console.log("🚀 ~ file: index.js ~ line 43 ~ data", { resultDetection });

      res.json({ resultCloudinary, resultDetection });
    }
    fs.unlinkSync(imagePath);
  } else {
    res.json({ result: false, message: resultCopy, data: {} });
  }
});

module.exports = router;
