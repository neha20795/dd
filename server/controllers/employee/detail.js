var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employee");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.get("/:name", function(req,res){
    var name =  req.params.name;
    console.log(name);
    Employee.find({ email : name}, function(err, result){
        console.log("in");
        console.log(result[0]);
        if(result.length >= 1)
        {
                var detail = {
                    fname:result[0].fname ,
                    lname:result[0].lname ,
                    email:result[0].email ,
                    address: result[0].address,
                    organization: result[0].organization ,
                    gender: result[0].gender,
                    image: result[0].image,
                    experience : result[0].experience
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
routes.get("/average/:name", function(request , response){
    var name =  request.params.name;
    Employee.ratingaverage( { empidreciever : name }, function(err, result){
        if(err){
            console.log(err)
            response.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            console.log(result);
            if(result.length>=1){
                Employee.ratingaverage2( { empid : name }, function(err, result1){
                    if(err){
                        console.log(err)
                        response.status(401).send({
                            success : false,
                            msg : "Search for relevant info"
                        });
                    }
                    else{
                        console.log(result1);
                        if(result1.length>=1){
                            console.log(result[0].RatingAverage+result1[0].RatingAverage);
                            var averageRating = (result[0].RatingAverage+result1[0].RatingAverage)/2;
                            response.status(200).send({
                                success : true,
                                msg : "Data Found",
                                averageRating
                            });
                        }
                        else{
                            response.status(200).send({
                                success : true,
                                msg : "Data Not Found"
                            });
                        }

                    }
                });
            }
            else{
                response.status(200).send({
                    success : true,
                    msg : "Data Not Found"
                });
            }

        }
    })
})
module.exports=routes;
