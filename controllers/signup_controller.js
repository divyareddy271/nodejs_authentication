const User = require("../models/user_schema")
const signup_mailer =require("../mailer/signup")
const queue = require("../Config/kue")
const signup_worker =require("../workers/signup_worker")
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
    let job = queue.create('emails', user).save(function(err){
        if (err){
            console.log('Error in sending to the queue', err);
            return;
        }
        console.log('job enqueued', job.id);
    
    })
    return res.render("signin")

}
module.exports.home = function(req,res){
    return res.render("home");
}