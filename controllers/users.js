const User = require("../models/user.js");


module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");

};

module.exports.signup=async(req,res)=>{
    try{
        let { username, password,email}=req.body;
    const newUser=  new User({email,username});
    const registeredUser=await User.register(newUser,password);
    //console.log(registeredUser);

//login after sign in ---------------------------------
    req.login(registeredUser,function(err){
        if(err){
            return next(err);
         }
         req.flash("success","Welcome to wanderlust!");
         res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin= (req,res)=>{

    res.render("users/login.ejs")

};

module.exports.loginn= async(req,res)=>{
    req.flash("success","Welcome back to wanderlust!");
    if(!res.locals.redirectUrl){
        
        res.redirect("/listings");
    }
    else{
        res.redirect(res.locals.redirectUrl);
    }

};

module.exports.logoutt=(req,res)=>{

    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })



};