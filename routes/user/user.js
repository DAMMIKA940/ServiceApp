const Routes = require('express').Router();
const storage = require('../../lib/multer');

const userController = require('../../controllers/user.controller');

Routes.post('/register', userController.create);
Routes.post('/login', userController.login);
Routes.put('/update/:id', userController.edit);
Routes.get('/all', userController.findAll);
Routes.get('/getbyId/:id', userController.findOne);
Routes.post('/logout', userController.logout);
Routes.post('/forgetpassword', userController.forgotPassword);
Routes.post('/reset-password/:token', userController.resetPassword);
Routes.get('/getUserDetailsByToken', userController.getUserDetailsByToken);


module.exports = Routes;

