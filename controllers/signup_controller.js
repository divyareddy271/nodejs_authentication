const User = require("../models/user_schema")
const signup_mailer =require("../mailer/signup")
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
    signup_mailer.signup(user);
    return res.render("signin")

}
module.exports.home = function(req,res){
    return res.render("home");
}