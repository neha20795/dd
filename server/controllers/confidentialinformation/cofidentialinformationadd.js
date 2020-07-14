var express = require("express");
var routes = express.Router();
var mongo = require("mongodb");
var Confidentialinformation = require("../../models/confidentialinformationevaluation");
var ConfidentialinformationDetail = require("../../models/confidentialinformation");

routes.post("/", function (req, res) {
    ConfidentialinformationDetail.insert(req.body.maininformation, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log(result['ops']._id);
            req.body.confid = result['ops']._id;
            Confidentialinformation.insert(req.body.information, function(err, result1){
                if(err){
                    console.log(err);
                    msg = 'Something went wrong';
                    return res.status(401).send({
                        success : false,
                     msg
                     });
                }
                else{
                    msg = 'Confidential Information Detail Added!!!!!';
                    return res.status(200).send({
                        success : true
                    });
                }
            })
        }
    })
});


routes.get("/:employeeid", function (req, res) {
    ConfidentialinformationDetail.find({}, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            if(result.length>=1){
                detail = result[0];
                msg = 'Confidential Information Found!!!!!';
                return res.status(200).send({
                    success : true,
                    msg,
                    detail
                });
            }
            else{
                msg = 'No Confidential Information Found!!!!!';
                return res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    });
});

routes.get("/", function (req, res) {
    ConfidentialinformationDetail.find({}, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            if(result.length>=1){
                detail = result;
                msg = 'Confidential Information Found!!!!!';
                return res.status(200).send({
                    success : true,
                    msg,
                    detail
                });
            }
            else{
                msg = 'No Confidential Information Found!!!!!';
                return res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    });
});

routes.delete("/", function (req, res) {
    ConfidentialinformationDetail.delete({}, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            if(result.length>=1){
                detail = result;
                msg = 'Confidential Information Found!!!!!';
                return res.status(200).send({
                    success : true,
                    msg,
                    detail
                });
            }
            else{
                msg = 'No Confidential Information Found!!!!!';
                return res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    });
});
module.exports=routes;