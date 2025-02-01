var express = require('express');
var router = express.Router();
const reviewController = require('../controllers/reviewController');
const {requireAuthUser} = require('../middlewares/authMiddlewares');
const {ControledAcces} = require('../middlewares/ControledAcces');

router.get('/getAllReviws',requireAuthUser,reviewController.getAllReviws );
router.post('/addReview/:id',requireAuthUser,reviewController.addReview );
router.put('/updateReview/:id',requireAuthUser,reviewController.updateReview );
// router.get('/getBookById/:id',requireAuthUser,bookContoller.getBookById );
router.delete('/deleteReviewById/:id',requireAuthUser,reviewController.deleteReviewById );


module.exports = router;
