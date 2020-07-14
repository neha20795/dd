var express = require("express");
var routes = express.Router();
var Employee = require("../../models/employeemoredetail");
var jwt = require("jsonwebtoken");
var sha1 = require("sha1");
var mongo = require("mongodb");
routes.post("/", function (req, res) {
 Employee.find({employeeid : req.body.email} , function (err, result1) {
     if(err){
         console.log(err);
         res.status(401).send({
             success : false,
             msg : "Search for relevant info"
         });
     }
     else{
         if(result1.length==0)
         {
             Employee.insert(req.body, function (err, result) {
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
             })
         }
         else{
             res.status(401).send({
                 success : false,
                 msg : "Data already exists"
             });
         }
     }

 })


});
routes.get("/:id", function (req, res) {
    console.log("Get more"+req.params.id)
    Employee.find({ employeeid : req.params.id }, function (err, result) {
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else {
            console.log("result="+result);
            if(result.length>=1){
                var detail = result[0];
                res.status(200).send({
                    success : true,
                    msg : "data found",
                    add : true,
                    detail
                });
            }
            else{
                console.log(err);
                res.status(200).send({
                    success : true,
                    msg : "No Data Found",
                    add :false
                });
            }
        }
    })
});
routes.get("/", function (req, res) {
    Employee.find({  }, function (err, result) {
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
                msg : "data found"
            });
        }
    })
});
routes.put("/", function (req, res) {
    console.log("Put")
    var em = req.body._id;
    delete req.body._id;
    Employee.update({_id : mongo.ObjectId(em)}, req.body, function(err, result){
        if(err){
            console.log(err);
            res.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            console.log(result['result']);
            console.log("Found")
            res.status(200).send({
                success : true,
                msg : "updated"
            });
        }
    } )
})

module.exports=routes;
