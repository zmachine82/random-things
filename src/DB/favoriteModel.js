const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema (
     {
        randomThingType: {
            type: String,
            required: true
        },

        userID:{ 
            type: String, 
            required: true
        },

        thing: {
            type: mongoose.Schema.Types.Mixed
        }
        
     }
)
const Favorite = mongoose.model ('Favorite', favoriteSchema)

module.exports = Favorite;