var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employee");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");

routes.post("/:email", function (req, res) {
    var em = req.params.email;
    console.log(req.body.image);
    console.log("Body--"+req.body);
    Employee.updateImage({email : em}, req.body, function (err, result) {
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            // console.log(result);
            res.status(200).send({
                success : true,
                msg : "updated"
            });
        }
    })
});
routes.get("/:email", function (req, res) {
    var em = req.params.email;
    Employee.find({email : em}, function (err, result) {
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            console.log(result);
            var detail = result[0].image;
            console.log(detail);
            res.status(200).send({
                success : true,
                msg : "updated",
                detail
            });
        }
    })
});

module.exports=routes;