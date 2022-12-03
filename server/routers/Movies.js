const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mustsignin = require("../middleWares/loginMiddleware.js");
const movies = mongoose.model("movies");
const User = mongoose.model("users");

router.post("/createmovie", Mustsignin, (req, res) => {
  const {
    title,
    year,
    genres,
    poster,
    contentRating,
    duration,
    releaseDate,
    originalTitle,
    storyline,
    actors,
    imdbRating,
  } = req.body;
  if (
    !title ||
    !year ||
    !genres ||
    !poster ||
    !contentRating ||
    !duration ||
    !releaseDate ||
    !originalTitle ||
    !storyline ||
    !actors ||
    !imdbRating
  ) {
    return res.status(405).json({ error: "please add all the required fields" });
  }
  req.user.password = undefined;
  const movie = new movies({
     title,
     year,
     genres,
     poster,
     contentRating,
     duration,
     releaseDate,
     originalTitle,
     storyline,
     actors,
     imdbRating,
    createdBy: req.user,
  });
  movie
    .save()
    .then((result) => {
      res.json({ message: "post created successfully!!!!", movie: result });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.get("/allmovie", Mustsignin, (req, res) => {
  movies
    .find()
    .populate("createdBy", "_id email")
    .sort("-createdAt")
    .then((movies) => {
      res.json({ movies });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.get("/mymovie", Mustsignin, (req, res) => {
  movies
    .find({ createdBy: req.user._id })
    .populate("createdBy", "_id email")

    .then((mymovies) => {
      res.json({ mymovies });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/deletemovie/:movieId", Mustsignin, (req, res) => {
  movies
    .findOne({ _id: req.params.movieId })
    .populate("createdBy", "_id")
    .exec((err, movie) => {
      if (err || !movie) {
        return res.status(422).json({ error: err });
      }
      if (movie.createdBy._id.toString() === req.user._id.toString()) {
        movie
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

// router.put("/updatemovie/:movieId", Mustsignin, (req, res) => {
//   movies.findByIdAndUpdate(
//     req.user._id,
//     { $set: { title: req.body.title } },
//     { new: true },
//     (error, result) => {
//       if (error) {
//         return res.status(422).json({ error: "can not update" });
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });

module.exports = router;