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

const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

// 1 new
router.get("/new", isLoggedIn, newForm);

router
  .route("/")
  .get(wrapAsync(index))

  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListing),
  );

// middleware for multer to upload files
// .post(upload.single("listing[image][url]"), (req, res) => {
//   res.send(req.file);
// });

router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));

// Index Route
// router.get("/", wrapAsync(index));

// Show Route
// router.get("/:id", wrapAsync(showListing));

// 2 Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(createListing));

// Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(updateListing),
// );

// Delete Route

// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
