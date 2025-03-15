const express= require("express");
const router= express.Router();

const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingsSchema, reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListiings}= require("../middleware.js");

const listingController= require("../controllers/listings.js");

const multer  = require('multer');

const {storage}=require("../cloudConfig.js")

const upload = multer({storage});



router.get("/my", isLoggedIn, wrapAsync(async (req, res) => {
    const userListings = await Listing.find({ owner: req.user._id }); // Fetch listings where the owner is the logged-in user
    res.render("listings/mylistings", { userListings });
}));


//INDEX and CREATE Route------
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListiings,
        wrapAsync(listingController.create));
        

        
//NEW ROUTE----------
router.get("/new",
          isLoggedIn,
          wrapAsync( listingController.new));


//EDIT ROUTE----------

router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(listingController.edit ));

//SHOW ,UPADET, DELETE route-----------
router.route("/:id")
     .get(wrapAsync(listingController.show ))
     .put(
         isLoggedIn,
         isOwner,
         upload.single('listing[image]'),
         validateListiings,
         wrapAsync( listingController.update))
     .delete(
            isLoggedIn,
            isOwner,
            wrapAsync(listingController.destroy));


//INDEX route------
//router.get("/",wrapAsync(listingController.index));




//CREATE ROUTE----------

/* router.post("/",
    isLoggedIn,
    validateListiings,
    wrapAsync(listingController.create)); */

//SHOW ROUTE----------

//router.get("/:id",wrapAsync(listingController.show ));



//UPDATE ROUTE----------

/* router.put("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync( listingController.update)); */

//DELETE ROUTE----------
/* 
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroy )); */


module.exports=router;