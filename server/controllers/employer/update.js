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

routes.post("/:email", function(req,res){
    //update mquery
    var em = req.params.email;
    Employee.update({email : em}, req.body, function(err, result){
        if(err){
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            console.log(result);
            console.log("Found")
            res.status(200).send({
                success : true,
                msg : "updated"
            });
        }
    } )
});

module.exports=routes;