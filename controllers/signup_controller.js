const User = require("../models/user_schema")
module.exports.signup = function(req,res){
    console.log("reached signup page");
    return res.render("signup")
}
module.exports.register = async function(req,res){
    let user =await User.create({
        user : req.body.name,
        password: req.body.password,
        email : req.body.email,
    })
    return res.render("signin")

}
module.exports.home = function(req,res){
    console.log("session",req.session)
    return res.render("home");
}