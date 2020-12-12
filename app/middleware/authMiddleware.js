const jwt = require('jsonwebtoken');

const jwtHelper = require('../../helper/jwtHelper');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            const user = jwtHelper.verifyToken(token);
            req.user = user;
            return next();
        }
        error.message = 'token must be include as Bearer [token]';
        return next(error);
    }

    error.message = 'token not found';
    return next(error);
}