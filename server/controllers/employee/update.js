var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employee");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.get("/:email", function(req,res){
    //code here;
    var name =  req.params.email;
    console.log(name);
    Employee.find({ email : name }, function(err, result){
        if(result.length >= 1)
        {
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
    
    console.log(req.body);
    Employee.update({email : em}, req.body, function(err, result){
        if(err){
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            console.log(result['result'].nModified);
            console.log("Found");
            var msg;
            if(result.length>=1)
            {
                msg : "updated succesfully"
            }
            else{
                msg : "no data found"
            }
            res.status(200).send({
                success : true,
                msg
            });
        }
    } )
});


module.exports=routes;