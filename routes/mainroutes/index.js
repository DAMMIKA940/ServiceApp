const routes = require('express').Router();

const userRoutes = require('../../routes/user/user');
const serviceRoutes = require('../../routes/service/service');
const jobDrafRoutes = require('../../routes/job/job');

routes.use('/user', userRoutes);
routes.use('/service', serviceRoutes);
routes.use('/job', jobDrafRoutes);

module.exports = routes;
