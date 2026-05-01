const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

//  to require dotenv
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const morgan = require("morgan");
const logger = require("./utils/logger.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// using router
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev")); // Log to console
app.use(morgan("combined", { stream: logger.stream })); // Log to file

const dbUrl = process.env.ATLAS_URL;
main()
  .then((res) => {
    console.log("Database working perfect🚀");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// Sessions options
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// using sessions
app.use(session(sessionOptions));
app.use(flash());

// passport is reuired session for remebering the user
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middlware
app.use((req, res, next) => {
  res.locals.success = req.flash("success")[0];
  res.locals.error = req.flash("error")[0];
  res.locals.currUser = req.user;
  res.locals.mapToken = process.env.MAP_TOKEN;
  next();
});

// app.get("/userdemo", async (req, res) => {
//   let fakeUser = new User({
//     email: "abc@gmail.com",
//     username: "abc",
//   });

//   let newUser = await User.register(fakeUser, "abc");

//   res.send(newUser);
// });

// it is use from ./routes/listing.js
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// app.get("/", (req, res) => {
//   res.send("Woring perfect");
// });

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  logger.error(err);
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
