const Listing= require("./models/listing");
const Review= require("./models/review.js")
const ExpressError= require("./utils/ExpressError.js");
const {listingsSchema, reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be Logged in!");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirecturl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner=async(req,res,next)=>{

    let {id}= req.params;
    let listing= await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of the listing");
        return res.redirect(`/listings/${id}`);

    }
    next();
}

module.exports.validateListiings= (req,res,next)=>{
    let {error}=listingsSchema.validate(req.body);
   
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
     throw new ExpressError(400, errMsg)
    }else{
        next();
    }

};


module.exports.validateReview= (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
   
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
     throw new ExpressError(400, errMsg)
    }else{
        next();
    }

};

module.exports.isAuthor=async(req,res,next)=>{

    let {id,reviewId}= req.params;
    let review= await Review.findById(reviewId);

    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of the review");
        return res.redirect(`/listings/${id}`);

    }
    next();
}
