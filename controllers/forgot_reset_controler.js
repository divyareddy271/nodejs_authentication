const User = require("../models/user_schema")

module.exports.forgot = function(req,res){
    return res.render("forget",{
        details:""
    })
}
module.exports.reset = async function(req,res){
    let user = await User.findOne({email : req.body.email});
    if(user){
        console.log("email sent")
        return res.render("forget",{
            details:"email sent successfully"
        })
    }
    else{
        console.log("Check the email");
        return res.render("forget" ,{
            details:"email is incorrect"
        })
    }
}