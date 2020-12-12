const express = require('express');
const user = express.Router();

const userController = require('./../app/controllers/userController');

user.post('/register', userController.register);
user.post('/login', userController.login);

module.exports = user;