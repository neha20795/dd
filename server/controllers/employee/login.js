var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employee");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.post("/", function(req, res){
    console.log(req.body);
    var e = req.body.username;
    var p = req.body.password;
    console.log(e+" "+p);
    Employee.find({ email : e }, function(err, result){
        console.log("in");
        if(result.length == 1)
        {
            if(result[0].password == sha1(req.body.password))
            {
                console.log("Match");
                console.log(result[0]);
                var detail = {
                    _id: result[0]._id ,
                    fname:result[0].fname ,
                    lname:result[0].lname ,
                    dob:result[0].dob ,
                    email:result[0].email ,
                    address: result[0].address,
                    organization: result[0].organization ,
                    qualification:result[0].qualification,
                    mobile:result[0].mobile,
                    experience:result[0].experience,
                    gender: result[0].gender,
                    image: result[0].image
                }
                var token = jwt.sign({ id : result[0]._id, name : result[0].full_name}, "this is my secret key", { expiresIn : 3600});
                res.status(200).send({
                    success : true,
                    detail,
                    token
                });
            }
            else
            {
                console.log("Password");
                res.status(401).send({
                    success: false,
                    msg: "This Password is Incorrect"
                });
            }
        }
        else{
            console.log("Username");
            res.status(401).send({
                success : false,
                msg : "This Username is Incorrect"
            });
        }
    });

});
module.exports=routes;