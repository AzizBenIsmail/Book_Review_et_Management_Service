var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json('testUsers mrigla');
});

router.get('/getAllUsers',userController.getAllUsers );
router.post('/register',userController.register );


module.exports = router;
