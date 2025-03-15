if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
//console.log(process.env);
}

const express= require('express');
const app=express();
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User= require("./models/user.js");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");
//const {listingsSchema, reviewSchema}=require("./schema.js");
//const Listing = require("./models/listing.js");
//const Review = require("./models/review.js");

const listingsRouter= require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter =require("./routes/user.js");
const { isLoggedIn } = require('./middleware.js');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')));


//const MONGO_URI = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl=process.env.ATLASTDB_URL;



main().
then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

/* 
//test route-------------

app.get("/testListing",async (req,res)=>{

    let sampleListing=new Listing({
        title: "My new Vila",
        description: "By the mountains",
        //image: "https://images.unsplash.com/photo-1739219959019-dd317f76c7e8?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 5000,
        location: "Darjling",
        country: "India"
    });

     await sampleListing.save();
     console.log("sample was saved");
        res.send("successful");

}); */


const store =MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
     },
     touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE", err)
});


const sessionOption= {
    store:store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+ 7*24*60*60*1000, //expire in 7 days
        maxAge:7*24*60*60*1000,
        httpOnly: true

    },

};





/* app.get('/',(req,res)=>{
    res.send('Hello World');
}); */


//one sesssion---------
app.use(session(sessionOption));
app.use(flash());
//passport for Authentication in oen session-----
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;//to store the user who use the current session
    next();
});


app.get("/demouser", async(req,res)=>{
    let fakeUser = new User({
        email: "abc@gmail.com",
        username: "abc234",
    });

   let registeredUser= await User.register(fakeUser,"password");
   res.send(registeredUser);

});




app.use("/",userRouter);



//Structured listings---
app.use("/listings", listingsRouter);



//structured reviews---
app.use("/listings/:id", reviewsRouter);


app.all("*",(req,res,next)=>{
    next (new ExpressError(401,"Page not Found !"));
})

//Error Handeling-------------

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Somthing Went Wrong!"}=err;
   // res.status(statusCode).send(message);
   res.status(statusCode).render("error.ejs",{message});
});



app.listen(8000,()=>{
    console.log('Server is running on port 8000');
});