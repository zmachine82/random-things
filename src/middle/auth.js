const jwt = require('jsonwebtoken')


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send('No token provided')
        return
        // throw new Error('No token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { userId } = decoded
        req.user = { userId }
        next()
    } catch (error) {
        res.status(401).send('Not authorized to access this route')
        // throw new Error('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware