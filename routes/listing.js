const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  newForm,
  showListing,
  createListing,
  updateListing,
  editListing,
  deleteListing,
} = require("../controller/listings.js");

// Index Route
router.get("/", wrapAsync(index));

// 1 new
router.get("/new", isLoggedIn, newForm);

// Show Route
router.get("/:id", wrapAsync(showListing));

// 2 Create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(createListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(updateListing),
);

// Delete Route

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
