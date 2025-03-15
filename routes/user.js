const express= require("express");
const router= express.Router();
const passport= require("passport");

const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirecturl ,isLoggedIn} = require("../middleware.js");

const userController= require("../controllers/users.js");


router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.renderLogin)
.post(
    saveRedirecturl,
    passport.authenticate("local",
    {failureRedirect:"/login", failureFlash:true}),

    userController.loginn
   );



//router.get("/signup",userController.renderSignup);


//router.post("/signup",wrapAsync(userController.signup));


//router.get("/login",userController.renderLogin);

/* 
router.post("/login",
    saveRedirecturl,
    passport.authenticate("local",
    {failureRedirect:"/login", failureFlash:true}),

    userController.loginn
   ); */


router.get("/logout",userController.logoutt );


module.exports=router;