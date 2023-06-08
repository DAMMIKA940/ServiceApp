const Routes = require('express').Router();
const storage = require('../../lib/multer');

const serviceController = require('../../controllers/service.controller');

Routes.post('/create',storage.single("image"), serviceController.create);
Routes.get('/all', serviceController.findAll);
Routes.get('/getbyId/:id', serviceController.findOne);
Routes.put('/update/:id', storage.single("image"),serviceController.update);
Routes.delete('/delete/:id', serviceController.delete);
Routes.get('/getbyServiceType/:type', serviceController.getbyServiceType);

module.exports = Routes;

