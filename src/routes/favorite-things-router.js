const express = require('express');
const router = express.Router();

const {addFavorite, getFavorites} = require('../controllers/random-things')

const authMiddleware = require('../middle/auth')

router.use(authMiddleware)

router.route('/').post(addFavorite)

router.route('/').get(getFavorites)


module.exports = router

