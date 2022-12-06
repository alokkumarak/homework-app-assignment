const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mustsignin = require("../middleWares/loginMiddleware.js");
const movies = mongoose.model("movies");
const User = mongoose.model("users");
const Gen=mongoose.model("genre");

let GenOptions=[];

router.post("/creategen",Mustsignin,(req,res)=>{
  // console.log(req.body)
  const {genres} =req.body
  if(!genres){
    return res
      .status(405)
      .json({ error: "please add generes" });
  }
  const gen=new Gen({
    genres
  })
  gen
    .save()
    .then((result) => {
      res.json({ message: "genres created successfully!!!!", genres: result });
    })
    .catch((error) => {
      console.log(error.message);
    });
})
router.get("/allgenres", Mustsignin, (req, res) => {
  Gen.find()
    .sort("-createdAt")
    .then((gen) => {
      for(let i=0;i<gen.length;i++){
        GenOptions[i]=gen[i].genres
      }
    //  GenOptions = gen.genres;
    //  console.log(GenOptions);
      res.json({ gen });
    })
    .catch((error) => {
      console.log(error.message);
    });
});


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

// filter movies :- search, sort, genres

router.get("/allmovie", Mustsignin, (req, res) => {
 
  const search=req.query.search || "";
  let sort = req.query.sort || "-createdAt";
  let genre=req.query.genre || "All";
  
  // console.log(genre)
  // console.log(GenOptions);
  // genre==="All" ? (genre=[...GenOptions]) : genre;

  req.query.sort?(sort=req.query.sort.split(",")) : (sort=[sort]);

  let sortBy={}
  if(sort[1]){
    sortBy[sort[0]]=sort[1];
  }
  else{
    sortBy[sort[0]]="asc";
  }
  
  movies
    // .find({
    //   $or: [
    //     { genres: { $regex: genre, $options: "i" } },
    //     { originalTitle: { $regex: search, $options: "i" } },
    //   ],
    // })
    .find({ originalTitle: { $regex: search, $options: "i" } })
    // .find({ genres: { $regex: genre, $options: "i" } })s
    // .where("genres")
    // .in([...genre])
    .populate("createdBy", "_id email")
    .sort(sortBy)
    .then((movies) => {
      // const total =  movies.countDocuments({
      //   genre: { $in: [...genre] },
      //   name: { $regex: search, $options: "i" },
      // });
      res.json({ movies });
    })
    .catch((error) => {
      console.log(error.message);
    });
});


// router.get("/allmovies",)

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

router.put("/updatemovie/:movieId", Mustsignin, (req, res) => {
  // console.log(req.body);
  
  movies.findByIdAndUpdate(
    req.params.movieId,
    {
      $set: {
        title: req.body.title,
        year: req.body.year,
        genres: req.body.genres,
        poster: req.body.poster,
        contentRating: req.body.contentRating,
        duration: req.body.duration,
        releaseDate: req.body.releaseDate,
        originalTitle: req.body.originalTitle,
        storyline: req.body.storyline,
        actors: req.body.actors,
        imdbRating: req.body.imdbRating,
      },
    },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(422).json({ error: "can not update" });
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;