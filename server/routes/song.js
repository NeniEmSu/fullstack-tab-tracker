const express = require('express')
const router = express.Router()

const songController = require('../controllers/songController')

// const auth = require('../middleware/auth')

router.get('/', songController.getAllSongs)

router.get('/:songId', songController.getSingleSong)

// router.post('/', auth, songController.addNewSong)

router.post('/', songController.addNewSong)
// router.put(
//   '/:songId',
//   songController.updateSong
// )

router.delete('/:songId', songController.deleteSong)

module.exports = router
