var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employee");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.get("/:name", function(req,res){
    var name =  req.params.name;
    console.log(name);
    Employee.find({ fname : name }, function(err, result){
        console.log("in");
        if(result.length >= 1)
        {
            var detail = new Array();
            console.log(result[0]);
            for(x=0;x<result.length;x++)
            {
                var detail1 = {
                    fname:result[x].fname ,
                    lname:result[x].lname ,
                    email:result[x].email ,
                    address: result[x].address,
                    organization: result[x].organization ,
                    gender: result[x].gender,
                    image: result[x].image
                }
                detail.push(detail1);
            }
            res.status(200).send({
                success : true,
                detail
            });
        }
        else{
            Employee.find({ organization : name }, function(err, result){
                if(result.length >= 1)
                {
                    console.log(result[0]);
                    var detail = {
                        _id: result[0]._id ,
                        fname:result[0].fname ,
                        lname:result[0].lname ,
                        email:result[0].email ,
                        address: result[0].address,
                        organization: result[0].organization ,
                        gender: result[0].gender,
                        image: result[0].image
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
            })
        }
    });
})
module.exports=routes;