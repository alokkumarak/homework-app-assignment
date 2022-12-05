const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const MovieModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genres: [
      {
        type: String,
        required: true,
      },
    ],
    poster: {
      type: String,
      required: true,
    },
    contentRating: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
      required: true,
    },
    storyline: {
      type: String,
      required: true,
    },
    actors: [
      {
        type:String,
        required:true
      },
    ],
    imdbRating:{
      type:Number,
      required:true
    },
    createdBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// MovieModel.index({
//   originalTitle: "text",
//   title:"text"
// },{
//   weights:{
//     originalTitle:5,
//     title:1
//   }
// }
// );

mongoose.model("movies", MovieModel);
