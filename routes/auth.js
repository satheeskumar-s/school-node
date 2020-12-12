const express = require('express');
const auth = express.Router();

auth.get('/protected', (req, res, next) => {
    res.end(`Hi ${req.user.firstName}, You are authenticated`);
});

module.exports = auth;