const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Video = require("../models/video");
const db = "mongodb://knganga:wanja197$@ds219095.mlab.com:19095/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.error("Error!" + err);
  }
});

//Getting list of all videos from the DB
router.get("/videos", function(req, res) {
  console.log("Get request for all videos");
  Video.find({}).exec(function(err, videos) {
    if (err) {
      console.log("Erros retrieving videos");
    } else {
      res.json(videos);
    }
  });
});

//Getting just one video from the DB
router.get("/videos/:id", function(req, res) {
  console.log("Get request for a single video");
  Video.findById(req.params.id).exec(function(err, video) {
    if (err) {
      console.log("Erros retrieving video");
    } else {
      res.json(video);
    }
  });
});

//Posting a video to the DB
router.post("/video", function(req, res) {
  console.log("Post a video");
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err, insertedVideo) {
    if (err) {
      console.log("Error saving video");
    } else {
      res.json(insertedVideo);
    }
  });
});

//Updating a video infor
router.put("/video/:id", function(req, res) {
  console.log("Updating a video");
  Video.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      }
    },
    {
      new: true,
      useFindAndModify: false
    },
    function(err, updatedVideo) {
      if (err) {
        res.send("Error updating Video");
      } else {
        res.json(updatedVideo);
      }
    }
  );
});

router.delete("/video/:id", function(req, res) {
  console.log("Deleting a Video");
  Video.findOneAndDelete(req.params.id, function(err, deletedVideo) {
    if (err) {
      res.send("Error deleting video");
    } else {
      res.json(deletedVideo);
    }
  });
});

module.exports = router;
