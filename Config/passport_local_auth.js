const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user_schema")
const bcrypt = require("bcryptjs")

// authentication using passport
passport.use(new LocalStrategy({
    usernameField : "email",
   },
   function (email,password,done) {
    User.findOne({email : email},async function(err,user){
        if(err){
            return done(err);
        }
        if(user){
            var passwordmatch = await bcrypt.compare(password,user.password)
            if(passwordmatch){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        }
        else{
            return done(null,false);
        }
    })
   }
))
passport.serializeUser(function(user,done){
        console.log(user,user.id);
        done(null,user.id);
})
passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            if(err){
                console.log("error in passport local");
                return done(err);
            }
            if(user){
                return done(null,user);
            }
            return done(null,false);
        })
})
passport.checkauthentication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect("/sign-in")
    }
}

module.exports = passport;