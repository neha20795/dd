var express = require("express");
var routes = express.Router();
var Employer = require("../../models/employer");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.get("/:email", function(req,res){
        //code here;
        var name =  req.params.email;
        console.log(name);
        Employer.find({ email : name }, function(err, result){
            if(result.length >= 1)
            {
                var detail = {
                    organization_name : result[0].organization_name,
                      address : result[0].address,
                      contact : result[0].contact,
                      employeeCapacity :result[0].employeeCapacity,
                      photos :result[0].photos,
                      email : result[0].email,
                      director : result[0].director,
                      ceo : result[0].ceo,
                      safetyRating : result[0].safetyRating
                }
                console.log(detail)
                res.status(200).send({
                    success : true,
                    detail
                });
            }
            else{
                console.log("Not found");
                res.status(401).send({
                     success : false,
                     msg : "Search for relevant info"
                });
            }
        });
    });




module.exports=routes;