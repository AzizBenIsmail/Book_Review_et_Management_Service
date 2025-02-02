var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
const {ControledAcces} = require('../middlewares/ControledAcces');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json('testUsers mrigla');
});

router.get('/getAllUsers',requireAuthUser,userController.getAllUsers );
router.post('/register',userController.register );
router.post('/login',userController.login );
router.get('/refreshToken',userController.refreshToken );
router.get('/logout',requireAuthUser,userController.logout );
router.delete('/deleteUserById/:id',requireAuthUser,ControledAcces,userController.deleteUser );


module.exports = router;
