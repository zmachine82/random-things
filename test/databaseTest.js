const mongoose = require('mongoose')
const clearDatabase = require('./clearDatabase')

function databaseTest() {
    beforeAll(async () => {
        await mongoose.connect(`${ process.env.MONGO_URL}`)
    })

    beforeEach(async () => {
        await clearDatabase()
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
}

module.exports = databaseTest