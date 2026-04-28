const Listing = require("../models/listing");
// This lines for accurate location using mapbox
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({accessToken : mapToken})

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.newForm = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!!!");
    return res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  // let { title, description, price, image, country, location } = req.body;
  // let listing = req.body.listing;
  let response = await geoCodingClient.forwardGeocode({
    query : req.body.listing.location,
    limit : 1
  }).send();
  // console.log(response.body.features[0].geometry);  

  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  if (response.body.features.length > 0) {
    newListing.geometry = response.body.features[0].geometry;
  } else {
    // Default or handle error
    newListing.geometry = { type: "Point", coordinates: [77.2090, 28.6139] };
  }

  let savedListing = await newListing.save();

  req.flash("success", "New Listing Added Successfully!");
  res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Bad Request");
  }
  let { id } = req.params;
  
  // Re-geocode if location is provided
  if (req.body.listing.location) {
    let response = await geoCodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    }).send();
    if (response.body.features.length > 0) {
      req.body.listing.geometry = response.body.features[0].geometry;
    }
  }

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  await listing.save();

  req.flash("success", "Successfully Updated listing");
  res.redirect(`/listings/${id}`);
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!!!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250,c_fill,ar_1.0/r_max/f_auto",
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "List Deleted Successfully!");
  res.redirect("/listings");
};
