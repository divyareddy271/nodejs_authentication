const User = require("../models/user_schema")
module.exports.signup = function(req,res){
    console.log("reached signup page");
    return res.render("signup")
}
module.exports.register = function(req,res){
    console.log(req.body);
    User.create({
        user : req.body.name,
        password: req.body.password,
        email : req.body.email,
    })
    return res.render("signin")

}
module.exports.home = function(req,res){
    return res.send("<h2>Successfully logged in</h2>");
}