const nodemailer = require("../Config/nodemailer");

exports.signup  = (user) =>
{
    console.log("inside signup mailer");
    let htmlstring = nodemailer.renderTemplate({user:user},"/signup.ejs")
    nodemailer.transporter.sendMail({
        from : "divyareddy271999@gmail.com",
        to : user.email,
        subject: "Successfully created the account",
        html : htmlstring,
    },(err,info)=> {
        if(err){
            console.log("eror in publishing email",err);
            return;
        }
       // console.log("mail sent successfully",info);
        return;
    }
    )
}