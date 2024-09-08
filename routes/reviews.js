const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../Utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review.js');
const reviews = require('../controllers/reviews.js')
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware.js');



router.post('/reviews', isLoggedIn, validateReview, catchAsync(reviews.createReviews));

router.delete('/reviews/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.destroyReviews));

module.exports = router;