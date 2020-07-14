var express = require("express");
var routes = express.Router();
var Employeetoemployer = require("../../../models/employeetoemployer");
var EmployeetoemployerDeleteRequest = require("../../../models/employeetoemployerdeleterequest");
var mongo = require("mongodb");

routes.get("/", function(req,res){
    Employeetoemployer.find({}, function (err, result) {
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
                        orgid : result[x].orgid,
                        pros : result[x].pros,
                        cons : result[x].cons,
                        type : result[x].type,
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
    Employertoemployer.delete({ _id : mongo.ObjectId(req.params)}, function (err, result1) {
        if(err){
            console.log("Error");
            res.status(401).send({
                success : false,
                msg : "error occured"
            });
        }
        else{
            EmployertoemployerDeleteRequest.delete({ reviewid : mongo.ObjectId(req.params.id) }, function (err, result2) {
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
