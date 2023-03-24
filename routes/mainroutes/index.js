const userRoutes = require('../../routes/user/user');
const routes = require('express').Router();

routes.use('/user', userRoutes);

module.exports = routes;
