const mongoose = require('mongoose')

async function clearDatabase() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany({}); // This will delete all documents in the collection
    }
};

module.exports = clearDatabase