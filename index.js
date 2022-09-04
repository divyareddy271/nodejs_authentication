
const express=require("express");
const db=require("./config/mongoose")
const environment = require("./Config/environment")
const passport = require("passport")
const passport_google_auth = require("./Config/passport_google")
const passport_local_authentication = require("./config/passport_local_auth")
const app = express();
const expressLayouts = require("express-ejs-layouts");
//SASS and SCSS
const scssMiddleware = require("node-sass-middleware");
const Mongo_Store = require("connect-mongo");
const port = 9000;
//an HTTP server-side framework used to create and manage a session middleware. 
const sessions = require("express-session");
//used to parse cookie header to store data on the browser whenever a session is established on the server-side.
const cookieParser = require("cookie-parser");
const path = require("path");
const oneDay = 1000 * 60 * 60 * 24;
//to use password cookie or session we need express-session and cookie-parser
app.use(sessions({
    //a random unique string key used to authenticate a session. It is stored in an environmen variable and can’t be exposed to the public.The key is usually long and randomly generated in a production environment.
    secret: environment.session_secret,
    saveUninitialized:true,
    //this sets the cookie expiry time. The browser will delete the cookie after the set duration elapses. The cookie will not be attached to any of the requests in the future.
    cookie: { maxAge: oneDay },
    resave: false,
    //without mongo store  session data would erase with server restart
    store : Mongo_Store.create({
        mongoUrl : "mongodb://0.0.0.0:27017/authentication",
            autoremove : "disabled",
        },function(err){
            console.log("error at mongo store",err || "connection established to store cookie");
        }
    )
}));
app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
app.set("views","./views");

// app.use("/uploads",express.static(__dirname+"/uploads"))
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware the server can access the necessary option to save, read and access a cookie.
app.use(cookieParser());
if(environment.name == "development" ){
    app.use(scssMiddleware ({
        src : path.join(__dirname,environment.assetpath,"scss"),
        dest : path.join(__dirname,environment.assetpath,"css"),
        debug : false,
        prefix :"/css",
        outputStyle : "expanded",
    }
    ))
   console.log( path.join(__dirname,environment.assetpath,"scss"),"and ",path.join(__dirname,environment.assetpath,"css"))
}
app.use(express.static(environment.assetpath));

app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".
//serving public file

app.use("/", require("./Routes/index"));
app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server");
    }
    else{
        console.log("application is listening on port:-",port);
    }
})