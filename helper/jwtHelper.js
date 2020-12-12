const jwt = require('jsonwebtoken');

const { jwt_secret_key } = require('./../config/geneal');

exports.generateToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }, jwt_secret_key, { expiresIn: '1h' });
}

exports.verifyToken = token => {
    const user = jwt.verify(token, jwt_secret_key);
    return user;
}