const express = require("express");
const upload = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authUser,
  upload.fields([{ name: "song" }, { name: "poster" }]),
  songController.uploadSong,
);
router.get("/", songController.getSong);
router.get("/all", authUser, songController.getAllSongs);
router.put(
  "/:songId",
  authUser,
  upload.fields([{ name: "song" }, { name: "poster" }]),
  songController.updateSong,
);
router.delete("/:songId", authUser, songController.deleteSong);

module.exports = router;
