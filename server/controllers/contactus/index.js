var express = require("express");
var routes = express.Router();
var Contact = require("../../models/contactus");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");
var mongo = require("mongodb");

routes.post("/", function (req, res) {
    Contact.insert(req.body, function (err, result) {
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else {
            console.log(result);
            res.status(200).send({
                success : true,
                msg : "Successfully inserted"
            });
        }
    });
});


module.exports=routes;
