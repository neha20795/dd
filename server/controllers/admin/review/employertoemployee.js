var express = require("express");
var routes = express.Router();
var Employertoemployee = require("../../../models/employertoemployee");
var EmployertoemployeeDeleteRequest = require("../../../models/employertoemployeedeleterequest");
var mongo = require("mongodb");


routes.get("/", function(req,res){
    Employertoemployee.find({}, function (err, result) {
        if(err){
            console.log("error"+err);
            res.status(401).send({
                success : false,
                msg : "Error Occured"
            });
        }
        else{
            if(result.length >= 1)
            {
                var detail = new Array();
                console.log(result[0]);
                for(x=0;x<result.length;x++)
                {
                    var detail1 = {
                        _id : result[x]._id,
                        empid : result[x].empid,
                        organizationid : result[x].organizationid,
                        review : result[x].review,
                        good : result[x].good,
                        bad : result[x].bad,
                        position : result[x].position,
                        rating : result[x].rating
                    }
                    detail.push(detail1);
                }
                res.status(200).send({
                    success : true,
                    detail
                });
            }
            else{
                console.log("No Request found");
                res.status(401).send({
                    success : false,
                    msg : "No more request"
                });
            }
        }
    })
});

routes.delete("/:id", function (req, res) {
    Employertoemployee.delete({ _id : mongo.ObjectId(req.params)}, function (err, result1) {
        if(err){
            console.log("Error");
            res.status(401).send({
                success : false,
                msg : "error occured"
            });
        }
        else{
            EmployertoemployeeDeleteRequest.delete({ reviewid : mongo.ObjectId(req.params.id) }, function (err, result2) {
                if(err){
                    console.log("Error");
                    res.status(401).send({
                        success : false,
                        msg : "error"
                    });
                }
                else{
                    res.status(200).send({
                        success : true,
                        msg : "Data deleted"
                    });
                }
            })
        }

    })
})
module.exports=routes;
