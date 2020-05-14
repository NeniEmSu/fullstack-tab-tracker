const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title_slug: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    albumImageUrl: {
      type: String,
      required: true,
    },
    youtubeId: {
      type: String,
      required: true,
    },
    lyrics: {
      type: String,
      required: true,
    },
    tab: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Song = mongoose.model('song', songSchema)
module.exports = Song
