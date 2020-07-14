var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employer");
var sha1 = require("sha1");


routes.put("/", function(req,res){

    var Email = req.body.email;
    console.log(Email);
    information = {
        password : sha1(req.body.newpassword)
    }
    Employee.update({ $and: [{ email : Email}, { password : sha1(req.body.oldpassword)}] }, information, function(err, result1){
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Something went wrong"
            });
        }
        else{
            console.log(result1.result);
            if(result1.result.ok == 1){
                res.status(200).send({
                    success : true,
                    msg : "Password Changed"
                });
            }
            else {
                res.status(401).send({
                    success : false,
                    msg : "Check your old password"
                });
            }
        }
    })
});


module.exports=routes;