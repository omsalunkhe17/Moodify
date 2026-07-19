const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
      default: "Unknown Artist",
    },
    mood: {
      type: String,
      enum: {
        values: [
          "sad",
          "happy",
          "surprised",
          "angry",
          "neutral",
          "fearful",
          "disgusted",
        ],
        message: "Enum this is ",
      },
      required: true,
    },
  },
  { timestamps: true },
);

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;
