const express = require("express");
const mongoose = require("mongoose")

const app = express()
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./DB/userModel');
const randomThingsRouter = require('./routes/random-things-router');
const favoriteThingsRouter = require('./routes/favorite-things-router');



app.use(express.json())
app.use('/random-things', randomThingsRouter)
app.use('/favorite', favoriteThingsRouter)

connectToDb()

// app.post('/favorite', thing )

 

// Things we need

// Favorites

// more random things
// handle random things in a generic way to make adding new random things easier


module.exports = app

async function connectToDb() {
    await mongoose.connect(`${process.env.MONGO_URL}`)
}
