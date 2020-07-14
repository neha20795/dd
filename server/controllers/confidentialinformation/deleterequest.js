var express = require("express");
var routes = express.Router();
var mongo = require("mongodb");
var ConfidentialinformationDetail = require("../../models/confidentialinformationdeleterequest");

routes.post("/", function (req, res) {
    ConfidentialinformationDetail.insert(req.body, function (err, result) {
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
                success : true,
                msg
            });
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