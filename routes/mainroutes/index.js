const routes = require('express').Router();

const userRoutes = require('../../routes/user/user');
const serviceRoutes = require('../../routes/service/service');

routes.use('/user', userRoutes);
routes.use('/service', serviceRoutes);

module.exports = routes;
