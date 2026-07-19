const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  try {
    const songUpload = req.files?.song?.[0];
    const posterUpload = req.files?.poster?.[0];
    const songBuffer = songUpload?.buffer;
    const { mood } = req.body;

    if (!songBuffer) {
      return res.status(400).json({ message: "Song file is required" });
    }

    const tags = id3.read(songBuffer);
    const songTitle = tags.title || "Untitled";
    const artistName = tags.artist || "Unknown Artist";

    const [songFile, posterFile] = await Promise.all([
      storageService.uploadFile({
        buffer: songBuffer,
        filename: `${songTitle}.mp3`,
        folder: "/cohort-2/moodify/songs",
      }),
      posterUpload?.buffer
        ? storageService.uploadFile({
            buffer: posterUpload.buffer,
            filename: `${songTitle}.jpeg`,
            folder: "/cohort-2/moodify/posters",
          })
        : Promise.resolve({ url: "" }),
    ]);

    const fallbackPosterUrl =
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80";

    const song = await songModel.create({
      title: songTitle,
      artist: artistName,
      url: songFile.url,
      posterUrl: posterFile.url || fallbackPosterUrl,
      mood,
    });

    res.status(201).json({
      message: "song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to upload song" });
  }
}

async function getSong(req, res) {
  try {
    const { mood } = req.query;

    const songs = await songModel.find({ mood });

    res.status(200).json({
      message: "songs fetched successfully",
      songs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch songs" });
  }
}

async function getAllSongs(req, res) {
  try {
    const songs = await songModel.find().sort({ createdAt: -1 });
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch songs" });
  }
}

async function updateSong(req, res) {
  try {
    const { songId } = req.params;
    const { title, artist, mood } = req.body;
    const song = await songModel.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (mood) song.mood = mood;

    if (req.files?.song?.[0]?.buffer) {
      const uploadedSong = await storageService.uploadFile({
        buffer: req.files.song[0].buffer,
        filename: `${song.title}.mp3`,
        folder: "/cohort-2/moodify/songs",
      });
      song.url = uploadedSong.url;
    }

    if (req.files?.poster?.[0]?.buffer) {
      const uploadedPoster = await storageService.uploadFile({
        buffer: req.files.poster[0].buffer,
        filename: `${song.title}.jpeg`,
        folder: "/cohort-2/moodify/posters",
      });
      song.posterUrl = uploadedPoster.url;
    }

    await song.save();
    res.status(200).json({ message: "Song updated successfully", song });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update song" });
  }
}

async function deleteSong(req, res) {
  try {
    const { songId } = req.params;
    const song = await songModel.findByIdAndDelete(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete song" });
  }
}

module.exports = { uploadSong, getSong, getAllSongs, updateSong, deleteSong };
