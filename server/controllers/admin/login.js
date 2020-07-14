var express = require("express");
var routes = express.Router();
var Admin = require("../../models/admin");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.post("/", function(req, res){
    console.log(req.body);
    var u = req.body.username;
    var p = req.body.password;
    console.log(u+" "+p);
    Admin.find({username : u}, function (err, result) {
        if(err){
            console.log("Error "+err);
            res.status(401).send({
                success : false,
                msg : "This Username and Password Incorrect"
            });
        }
        else{
            console.log(result);
            if(result.length<1){
                console.log("Username");
                res.status(401).send({
                    success : false,
                    msg : "User Not Found"
                });
            }
            else{
                if(result[0].password == sha1(p)){
                    console.log("Match");
                    var token = jwt.sign({ id : result[0]._id }, "this is my secret key", { expiresIn : 3600});
                    res.status(200).send({
                        success : true,
                        msg : "Successful",
                        token
                    });
                }
                else{
                    console.log("Password");
                    res.status(401).send({
                        success : false,
                        msg : "Check your Password"
                    });
                }
            }
        }
    })

});
module.exports=routes;