const User = require("../models/user_schema");
const bycrypt = require("bcryptjs")
module.exports.signin = function(req,res){
    return res.render("signin")
}
module.exports.createsession = async function(req,res){
    try{
        let user = await User.findOne({email : req.body.email});
        if(user){
            let passwordmatch = await bycrypt.compare(req.body.password,user.password);
            if(passwordmatch){
                console.log("successfully logged in match");
                return res.redirect("/");
            }
            else{
                console.log("incorect password");
                return res.redirect("back");
             }
        } 
    }
    catch(err){
        console.log("error in finding user");
        return res.redirect("back");
    }
}
