require('dotenv').config();
const jwt = require('jsonwebtoken');

// Route protection middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // if auth header exists, the token should be sent with the request
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports =  { authenticateJWT };