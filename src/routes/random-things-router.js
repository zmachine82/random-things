const express = require('express');
const router = express.Router();

const {getRandomThing, randomPokemonController} = require('../controllers/random-things')

const authMiddleware = require('../middle/auth')

router.use(authMiddleware)

router.route('/').get(getRandomThing)

router.route('/randomPokemon').post(randomPokemonController)


module.exports = router

