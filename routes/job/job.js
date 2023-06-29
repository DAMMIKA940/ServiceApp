const Routes = require('express').Router();

const drafController = require('../../controllers/draf.controller');

Routes.post('/job-draft', drafController.create);
Routes.get('/all', drafController.findAll);
Routes.get('/getbyId/:id', drafController.findOne);
Routes.put('/update/:id', drafController.update);
Routes.delete('/delete/:id', drafController.delete);

module.exports = Routes;