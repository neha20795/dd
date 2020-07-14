var express = require("express");
var routes = express.Router();
var mongo = require("mongodb");
var Confidentialinformation = require("../../models/confidentialinformationrequest");


routes.get("/:email", function(req, res) {
console.log(req.params.email);
var email = req.params.email;
    // { $and : [ { EmployeeEmail : em}, { EmployeeStatus : false}]}
    Confidentialinformation.lookupConfidentialInfo(  { $and: [{SenderemailId: email}, { ReceiverStatus: true }] }, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg,
            });
        }
        else {
            console.log(result);
            if(result.length>=1){
                var detail = new Array();
            for(x=0;x<result.length;x++){
                var detail1 = {
                _id: result[x]._id,
                ReceiverName: result[x].ReceiverName,
                EmployeeEmail: result[x].EmployeeEmail,
                receivername: result[x].receivername,
                employeename: result[x].employeename
            }
             detail.push(detail1);
        }

            return res.status(200).send({
                success : true,
                detail
            });
            }
            else{
                msg = 'Unable to Process';
                return res.status(401).send({
                    success : false,
                    msg
                });
            }
        }

    })
});


module.exports=routes;


// var detail = new Array();
// for(x=0;x<result.length;x++){
//     var detail1 = {
//         _id: result[x]._id,
//         SenderemailId: result[x].SenderemailId,
//         ReceiverName: result[x].ReceiverName,
//         EmployeeEmail: result[x].EmployeeEmail,
//     }
//     detail.push(detail1);
// }
// msg = 'Found!!!!!';
// return res.status(200).send({
//     success : true,
//     msg,
//     detail
// });