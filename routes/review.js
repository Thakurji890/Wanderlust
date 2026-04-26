const express = require("express");
const router = express.Router({ mergeParams: true });

// If { mergeparams } is not defined that it will throw an erro becouse
// when we hit the submit button on the review then it will not redirect that id
// that defined in app.js -- > so becouse of mergeparams it is possible
//  to access the id

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const { createReview, deleteReview } = require("../controller/reviews.js");

//  review post  route
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

// Delete review route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview),
);

module.exports = router;
