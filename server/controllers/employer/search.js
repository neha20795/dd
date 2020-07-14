var express = require("express");
var routes = express.Router();
var Employer = require("../../models/employer");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.get("/:name", function(req,res){
    var name =  req.params.name;
    console.log(name);
    Employer.find({ organization_name : name }, function(err, result){
        console.log("in");
        if(result.length >= 1)
        {
            var detail = new Array();
            console.log(result[0]);
            for(x=0;x<result.length;x++)
            {
                var detail1 = {
                    organization_name : result[x].organization_name,
                    address : result[x].address,
                    contact : result[x].contact,
                    employeeCapacity :result[x].employeeCapacity,
                    photos :result[x].photos,
                    email : result[x].email
                }
                detail.push(detail1);
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
})
module.exports=routes;