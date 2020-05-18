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
      _userId: res.locals._userId,
      _userName: res.locals._userName,
    })
    const newSong = await song.save()

    res.status(200).json({
      type: 'success',
      message: 'Song Added successfully!',
      newSong,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.updateSong = async (req, res, next) => {
  try {
    const id = req.params.songId
    const titleSlug = slug(req.body.title)
    const newSong = await Song.updateOne(
      {
        _id: id,
        _userId: res.locals._userId,
      },
      {
        title: req.body.title,
        title_slug: titleSlug,
        artist: req.body.artist,
        album: req.body.album,
        albumImageUrl: req.body.albumImageUrl,
        youtubeId: req.body.youtubeId,
        tab: req.body.tab,
        lyrics: req.body.lyrics,
        genre: req.body.genre,
        _userName: res.locals._userName,
      }
    )
    if (newSong.nModified === 0)
      return res.status(403).json({
        type: 'error',
        error: "You Do not have access to update a songs you didn't create!",
      })

    res.status(200).json({
      type: 'success',
      message: 'Song Updated successfully!',
      newSong,
    })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}

exports.getAllSongs = async (req, res) => {
  try {
    let songs = null
    const search = req.query.search
    if (search) {
      songs = await Song.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { artist: { $regex: search, $options: 'i' } },
          { album: { $regex: search, $options: 'i' } },
          { genre: { $regex: search, $options: 'i' } },
        ],
      }).sort({
        createdAt: -1,
      })
    } else {
      songs = await Song.find().sort({ createdAt: -1 })
    }

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
    const result = await Song.deleteOne({
      _id: id,
      _userId: res.locals._userId,
    })
    if (result.deletedCount === 0)
      return res.status(403).json({
        type: 'error',
        error: "You Do not have access to delete songs you didn't create!",
      })
    res.status(200).json({ type: 'success', result })
  } catch (error) {
    res.status(500).json({ type: 'error', error })
  }
}
