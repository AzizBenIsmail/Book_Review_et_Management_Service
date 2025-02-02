var express = require('express');
var router = express.Router();
const bookContoller = require('../controllers/bookContoller');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
const {ControledAcces} = require('../middlewares/ControledAcces');
const uploadfile = require('../middlewares/uploadfile');

router.get('/getAllBooks',requireAuthUser,bookContoller.getAllBooks );
router.post('/addBook',requireAuthUser,uploadfile.single("book_image"),bookContoller.addBook );
router.put('/updateBook/:id',requireAuthUser,uploadfile.single("book_image"),bookContoller.updateBook );
router.get('/getBookById/:id',requireAuthUser,bookContoller.getBookById );
router.get('/searchBooks',requireAuthUser,bookContoller.searchBooks );
router.get('/searchFilterBooks',requireAuthUser,bookContoller.searchFilterBooks );
router.delete('/deleteBookById/:id',requireAuthUser,ControledAcces,bookContoller.deleteBookById );


module.exports = router;
