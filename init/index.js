const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config({ path: "../.env" });

main()
  .then((res) => {
    console.log("Database working perfect");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69ea3e5b867100960a0b4393",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data intered Successfully ");
};

initDB();
