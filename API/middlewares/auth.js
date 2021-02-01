const jwt = require('jsonwebtoken');
const storage = require('../db/memory')



const isAuthenticated = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        const decodedToken = jwt.verify(authorization, process.env.SECRET);

        const user = storage.getUser(decodedToken.email)

        if (!user) {
            throw new Error('token error')
        }

        req.auth = decodedToken;

    } catch (e) {
        res.status(401).send('Not authenticated')
        return
    }
    next();
}

module.exports = {
    isAuthenticated
}