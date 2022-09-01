const mongoose = require("mongoose");
const bycrpt = require("bcryptjs")
const User_Schema = new mongoose.Schema({
    user : {
        type : String,
        require :true,
        unique : true,
    },
    email: {
        type : String,
        require :true,
        unique : true,
    },
    password : {
        type : String,
    },

},{
    timestamps : true
})
User_Schema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the pass before hash :-${this.password}`);
        var saltRound = 10;
        this.password = await bycrpt.hash(this.password,saltRound);
        console.log(`the pass after hash :-${this.password}`);
    
    }
    next();
})

const User = new mongoose.model("User",User_Schema)
module.exports = User;