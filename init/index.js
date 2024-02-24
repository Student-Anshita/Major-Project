const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

main()
 .then(()=>{
    console.log("Connection Successfull");
 })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

const initDB = async ()=>{
    await Listing.deleteMany({});         //pehle koi random data hai to usko delete kar dega
    initData.data = initData.data.map((obj) => ({ ...obj, owner : "65cc9e59027fdfc698d414c8"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialize");
};

initDB();