const routes = require('express').Router();

const authMiddleware = require('./../app/middleware/authMiddleware');

const userRoutes = require('./user');
const authRoutes = require('./auth');

routes.use('/user', userRoutes);
routes.use('/auth', authMiddleware, authRoutes);

module.exports = routes;