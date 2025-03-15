const express= require("express");
const router= express.Router({mergeParams:true});


const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingsSchema, reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn,isAuthor}= require("../middleware.js")


const reviewController=require("../controllers/reviews.js");

//REVIEWS ------

//Post Route----
router.post("/reviews",
  isLoggedIn,
  validateReview,
   wrapAsync(reviewController.createReview));


//Delete review------

router.delete("/reviews/:reviewId", 
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.deleteReview));


module.exports=router;