const passport = require("passport");
const environment = require("../Config/environment")
const google_oauth_strategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user_schema");
const crypto = require("crypto");
const signup_mailer = require("../mailer/signup")
try{
    
passport.use(new google_oauth_strategy({
    clientID :environment.google_clientID,
    clientSecret : environment.google_clientSecret,
    callbackURL : environment.google_callbackURL,
},
    async function(accessToken,refreshToken,profile,done){
        console.log("reached-pr",profile,done)
        console.log(profile.emails[0].value)
        let user = await User.findOne({email : profile.emails[0].value});
        
        if(user!=null){
            console.log("reached-pr-us",user)
            return done(null,user);
        }
        else{
            let user = await User.create({
                user : profile.displayName,
                email : profile.emails[0].value,
                password :crypto.randomBytes(20).toString("hex"),
            })
            signup_mailer.signup(user);
            console.log("reached-pr-user",user)
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
    }
))
}
catch(err){
    if(err){
        console.log("cannot authe user via google strategy",err);
        return done(null);
    }
}