const express=require("express");

const port = 6000;
const path = require("path");
const app = express();


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use("/", require("./Routes"));
app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server");
    }
    else{
        console.log("application is listening on port:-",port);
    }
})