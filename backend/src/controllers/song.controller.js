import { uploadFile } from '../services/storage.service.js'
import songModel from '../models/song.model.js'

// Upload a new song
export async function upload(req, res) {
  try {
    const { artist, title } = req.body

    if (!req.file || !artist || !title) {
      return res.status(400).json({ message: "All fields are required: file, artist, title" })
    }

    const result = await uploadFile(req.file.buffer)
    const audioUrl = result.url

    const song = await songModel.create({
      artist,
      title,
      audio: audioUrl,
    })

    res.status(201).json({
      message: "Song uploaded successfully",
      song: {
        id: song._id,
        title: song.title,
        artist: song.artist,
        audio: song.audio
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// Get all songs
export async function getSongs(req, res) {
  try {
    const songs = await songModel.find().sort({ createdAt: -1 }) // newest first
    res.status(200).json({
      message: "Songs fetched successfully",
      songs
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// Get a song by ID
export async function getSongById(req, res) {
  try {
    const songId = req.params.mama

    const song = await songModel.findById(songId)

    if (!song) {
      return res.status(404).json({ message: "Song not found" })
    }

    res.status(200).json({
      message: "Song fetched successfully",
      song
    })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

// Search songs by title or artist
export const searchSong = async (req, res) => {
  try {
    const query = req.query.text || '';
    
    // Simple validation
    if (!query) {
      return res.status(200).json({ songs: [] });
    }

    // Basic search without regex
    const songs = await songModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id title artist audio poster')
    .limit(20)
    .lean();

    return res.status(200).json({ songs });
    
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ 
      message: 'Search failed',
      error: error.message 
    });
  }
};
