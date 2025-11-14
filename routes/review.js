const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utility/wrapAsync.js");
const ExpressErr = require("../utility/ExpressError.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controller/review.js");


//reviews
//post Rout
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview));


//Delete Review rout
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
   wrapAsync(reviewController.deleteReview));

module.exports = router;
