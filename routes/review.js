const express = require("express");
const router = express.Router({ mergeParams: true });

// If { mergeparams } is not defined that it will throw an erro becouse
// when we hit the submit button on the review then it will not redirect that id
// that defined in app.js -- > so becouse of mergeparams it is possible
//  to access the id

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  // console.log(result);
  if (error) {
    // let errMsg = error.details.map((el) => el.message.join(","));
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//  review post  route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("Review Saved");
    req.flash("success", "Successfully Review Added!");
    res.redirect(`/listings/${listing._id}`);
  }),
);

// Delete review route

router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    console.log("Deleting review", reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully Deleted Review!");
    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
