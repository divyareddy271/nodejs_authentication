const express=require("express");
const db=require("./config/mongoose")
const app = express();
const port = 9000;
const path = require("path");

app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
app.set("views","./views");
// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use("/", require("./Routes/index"));
app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server");
    }
    else{
        console.log("application is listening on port:-",port);
    }
})