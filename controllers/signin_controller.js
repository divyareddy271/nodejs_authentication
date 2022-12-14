const User = require("../models/user_schema");
const bycrypt = require("bcryptjs")
module.exports.signin = function(req,res){
    return res.render("signin")
}
module.exports.createsession = async function(req,res){
    return res.redirect("/");
}
module.exports.logout = function(req,res){
    req.session.destroy();//to destroy session
    req.logout(function(err){
        if(err){
            return;
        }})//to remove req.user
       // req.flash("success","Logged out successfully");
    return res.redirect("/");
}
module.exports.update = async function(req,res){
    var id;
    if(req.user){
         id=req.user.id;
         let user = await User.findById(id);
         user.password = req.body.password;
         user.save();
    }
  
    return res.redirect("/");
}

module.exports.reset = function(req,res){
    return res.render("reset");
}
