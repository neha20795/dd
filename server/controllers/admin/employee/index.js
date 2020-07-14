
var express = require("express");
var routes = express.Router();
var Employee = require("../../../models/employee");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");
var mongo = require("mongodb");
routes.get("/", function(req,res){

    Employee.find({ }, function(err, result){
        console.log("in");
        console.log(result[0]);
        if(result.length >= 1)
        {
            var detail = new Array();
            console.log(result[0]);
            for(x=0;x<result.length;x++)
            {
                var detail1 = {
                    _id : result[x]._id,
                    fname:result[x].fname ,
                    lname:result[x].lname ,
                    dob : result[x].dob,
                    email:result[x].email ,
                    mobile : result[x].mobile,
                    qualification : result[x].qualification,
                    address: result[x].address,
                    organization: result[x].organization ,
                    experience : result[x].experience,
                    gender: result[x].gender
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
    var id = req.query.id;
    Employee.delete({ _id : mongo.ObjectId(req.query.id)}, function (err, result) {
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
