// const express=require("express");
// const db=require("./config/mongoose")
// const app = express();
// const port = 9000;
// const path = require("path");

// app.set("view engine","ejs");
// // app.set("views",path.join(__dirname,"views"));
// app.set("views","./views");
// // middleware
// app.use(express.json());
// app.use(express.urlencoded());
// //to use password cookie or session we need express-session and cookie-parser

// app.use("/", require("./Routes/index"));
// app.listen(port,function(err){
//     if(err){
//         console.log("Error in connecting to server");
//     }
//     else{
//         console.log("application is listening on port:-",port);
//     }
// })
//a web framework for Node.js used to create HTTP web servers. 
const express=require("express");
const db=require("./config/mongoose")
const app = express();
const port = 9000;
//an HTTP server-side framework used to create and manage a session middleware. 
const sessions = require("express-session");
//used to parse cookie header to store data on the browser whenever a session is established on the server-side.
const cookieParser = require("cookie-parser");
const path = require("path");
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    //a random unique string key used to authenticate a session. It is stored in an environmen variable and can’t be exposed to the public.The key is usually long and randomly generated in a production environment.
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    //this sets the cookie expiry time. The browser will delete the cookie after the set duration elapses. The cookie will not be attached to any of the requests in the future.
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
app.set("views","./views");
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware the server can access the necessary option to save, read and access a cookie.
app.use(cookieParser());

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