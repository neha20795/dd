var express = require("express");
var routes = express.Router();
var Employer = require("../../models/employer");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.post("/", function(req, res){
    console.log(req.body);
    var e = req.body.username;
    var p = req.body.password;
    console.log(e+" "+p);
    Employer.find({ email : e }, function(err, result){
        console.log("in");
        if(result.length == 1)
        {
            if(result[0].password == sha1(req.body.password))
            {
                console.log("Match");
                console.log(result[0]);
                var detail = {
                    _id: result[0]._id ,
                    organization_name:result[0].organization_name ,
                    registration_date:result[0].registration_date ,
                    certification_type:result[0].certification_type ,
                    email:result[0].email ,
                    director: result[0].director,
                    ceo: result[0].ceo ,
                    address:result[0].address,
                    contact:result[0].contact,
                    employeeCapacity:result[0].employeeCapacity,
                    safetyRating: result[0].safetyRating,
                    photos: result[0].photos
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