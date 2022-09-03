const queue = require("../Config/kue");
const signup_mailer = require("../mailer/signup")

queue.process("emails",function(job,done){
    console.log("workers email is processing");
    signup_mailer.signup(job.data);
    done();
})