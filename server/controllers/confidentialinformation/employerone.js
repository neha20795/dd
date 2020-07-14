var express = require("express");
var routes = express.Router();
var Confidentialinformation = require("../../models/confidentialinformationrequest");
var Employer = require("../../models/employer");

routes.post("/", function(req, res){
    console.log("inside add data conf");
    Employer.find({organization_name : req.body.ReceiverName }, function(err, result1){
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            if(result1.length>=1){
                req.body.ReceiverName = result1[0].email;
                Confidentialinformation.insert(req.body, function (err, result) {
                    if(err){
                        console.log(err);
                        msg = 'Something went wrong';
                        return res.status(401).send({
                            success : false,
                            msg
                        });
                    }
                    else{
                        msg = 'Confidential Information Request Sent!!!!!';
                        return res.status(200).send({
                            success : true,
                            msg
                        });
                    }
                });
            }
        }
    })
});

routes.get("/:email", function(req, res){
    var em = req.params.email;

    Confidentialinformation.lookupConfidentialInfo( { SenderemailId : em}, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log(result);
            if(result.length>=1){
                var detail = new Array();
                for(x=0;x<result.length;x++){
                    var detail1 = {
                        _id: result[x]._id,
                        SenderemailId: result[x].SenderemailId,
                        ReceiverName: result[x].ReceiverName,
                        EmployeeEmail: result[x].EmployeeEmail,
                        SenderStatus: result[x].SenderStatus,
                        ReceiverStatus: result[x].ReceiverStatus,
                        EmployeeStatus: result[x].EmployeeStatus,
                        sendername: result[x].sendername,
                        receivername: result[x].receivername,
                        employeename: result[x].employeename
                    }
                    detail.push(detail1);
                }
                msg = 'Confidential Information Request Sent!!!!!';
                return res.status(200).send({
                    success : true,
                    msg,
                    detail
                });
            }
            else{
                msg = 'No request found';
                return res.status(200).send({
                    success : true,
                    msg
                });
            }

        }
    })
});

routes.put("/update", function(req, res){
    console.log(req.body);
    var id = req.body._id;
    delete req.body._id;
    var information = {
        SenderemailId: req.body.SenderemailId,
        ReceiverName: req.body.ReceiverName,
        EmployeeEmail: req.body.EmployeeEmail,
        SenderStatus: req.body.SenderStatus,
        ReceiverStatus: req.body.ReceiverStatus,
        EmployeeStatus: req.body.EmployeeStatus
    }
    Confidentialinformation.updateEmployeeStatus({ _id : mongo.ObjectId(id)}, information, function (err, result) {
        if(err){
            console.log(err);
            console.log("Error");
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log(result);
            if(result.length>=1)
            {
                console.log("Found")
                msg = 'Data Updated';
                return res.status(200).send({
                    success : true,
                    msg
                });
            }
            else{
                console.log("Not Found")
                msg = 'No Data found';
                return res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    })
});
module.exports=routes;