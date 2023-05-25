const Routes = require('express').Router();
const storage = require('../../lib/multer');

const serviceController = require('../../controllers/service.controller');

Routes.post('/create', serviceController.create);
Routes.get('/all', serviceController.findAll);
Routes.get('/getbyId/:id', serviceController.findOne);
Routes.put('/update/:id', serviceController.update);
Routes.delete('/delete/:id', serviceController.delete);

module.exports = Routes;

