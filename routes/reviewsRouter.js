var express = require('express');
var router = express.Router();
const reviewController = require('../controllers/reviewController');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
const {ControledAcces} = require('../middlewares/ControledAcces');

router.get('/getAllReviws',requireAuthUser,reviewController.getAllReviws );
router.post('/addReview/:id',requireAuthUser,reviewController.addReview );
// router.put('/updateBook/:id',requireAuthUser,uploadfile.single("book_image"),bookContoller.updateBook );
// router.get('/getBookById/:id',requireAuthUser,bookContoller.getBookById );
// router.delete('/deleteBookById/:id',requireAuthUser,ControledAcces,bookContoller.deleteBookById );


module.exports = router;
