var express = require("express");
var routes = express.Router();
var Employer = require("../../../models/employer");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");
var mongo = require("mongodb");


routes.get("/", function(req,res){
    Employer.find({ }, function(err, result){
        if(result.length >= 1)
        {
                var detail = new Array();
                console.log(result[0]);
                for(x=0;x<result.length;x++)
                {
                    var detail1 = {
                        _id : result[x]._id,
                        organization_name : result[x].organization_name,
                        email : result[x].email,
                        address : result[x].address,
                        certification_type :result[x].certification_type ,
                        director :result[x].director ,
                        ceo :result[x].ceo,
                        contact : result[x].contact,
                        employeeCapacity :result[x].employeeCapacity,
                        safetyRating : result[x].safetyRating
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
});
routes.delete("/", function (req, res) {
    Employer.delete({ _id : mongo.ObjectId(req.query.id)}, function (err, result) {
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Error Occured"
            });
        }
        else {
            res.status(200).send({
                success : true,
                msg : "successfully deleted employer"
            });
        }
    })
})

module.exports=routes;
