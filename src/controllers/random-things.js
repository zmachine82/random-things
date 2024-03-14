const randomPokemon = require('../random-things/randomPokemon')
const Favorite = require('../DB/favoriteModel')

function getRandomThing(req, res) {
    res.status(200).json([
        {
            name: 'randomPokemon',
            text: 'Random Pokemon'
        }
    ])
}

async function randomPokemonController(req, res) {
    res.status(200).json(
        await randomPokemon()
    )

}

async function addFavorite(req, res) {
    const userID = req.user.userId
    req.body.userID = userID
   
    const favorite = await Favorite.create(req.body);
    return res.status(201).send('')
}

async function getFavorites(req, res) {
    const favorite = await Favorite.find({userID: req.user.userId})
    return res.status(200).json(favorite)
}

module.exports = {
    getRandomThing,
    randomPokemonController,
    addFavorite,
    getFavorites
}