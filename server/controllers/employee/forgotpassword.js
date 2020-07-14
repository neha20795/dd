var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employee");
var random = require("randomstring");
// var jwt = require("jsonwebtoken");
var sha1 = require("sha1");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        user : "tapangarments07@gmail.com",
        pass : "9229723441"
    }
})

routes.get("/:email", function(req,res){
    var Email = req.params.email;
    console.log(Email);
    var rand = random.generate(6);
    var code = rand;
    var mailOptions = {
        from : "tapangarments07@gmail.com",
        to : req.params.email,
        subject : "Sending mail for password generation",
        text : "Your password verification code is "+code
    }

    Employee.find({ email : Email }, function(er, result){
        if(er){
            console.log("error");
            res.status(401).send({
                success : false,
                msg : "Something went wrong"
            });
        }
        else{
            console.log(result);
            if(result.length<1){
                console.log("You must sign in Before");
                res.status(200).send({
                    success : true,
                    msg : "You must sign in Before"
                });
            }
            else{
                console.log(code);
                var information = {
                    password : sha1(code)
                }
                console.log(information);
                Employee.update({ email : Email }, information, function(err, result1){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(result1);
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error);
                                res.status(401).send({
                                    success : false,
                                    msg : "Something went wrong"
                                });
                            }
                            else{
                                console.log("Email Sent: "+info.response);
                                res.status(200).send({
                                    success : true,
                                    msg : "Please Check your email for new Login Password"
                                });
                            }
                        })
                    }
                })
            }
        }
    })
});


module.exports=routes;