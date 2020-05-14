const Song = require('../models/songsModel')

const slug = function (str) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}

exports.addNewSong = async (req, res, next) => {
  try {
    const titleSlug = slug(req.body.title)
    const song = new Song({
      title: req.body.title,
      title_slug: titleSlug,
      artist: req.body.artist,
      album: req.body.album,
      albumImageUrl: req.body.albumImageUrl,
      youtubeId: req.body.youtubeId,
      tab: req.body.tab,
      lyrics: req.body.lyrics,
      genre: req.body.genre,
    })
    const newSong = await song.save()

    res.status(200).json({
      type: 'success',
      newSong,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 })

    res.status(200).json({
      type: 'success',
      songs,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.getSingleSong = async (req, res) => {
  try {
    const id = req.params.songId
    const song = await Song.findOne({ _id: id })
    if (!song)
      return res.status(403).json({ type: 'error', error: 'Song not found!' })

    res.status(200).json({ type: 'success', song })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.deleteSong = async (req, res) => {
  try {
    const id = req.params.songId
    const result = await Song.deleteOne({ _id: id })
    res.status(200).json({ type: 'success', result })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}
