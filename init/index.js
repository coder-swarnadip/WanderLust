const mongoose= require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/listing.js");

const MONGO_URI = "mongodb://127.0.0.1:27017/wanderlust";

main().
then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error:',err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}


const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner: "67d3257186a24a7a1446b49f"}));
    await Listing.insertMany(initData.data);
    console.log("DB initialized");
}


initDB();