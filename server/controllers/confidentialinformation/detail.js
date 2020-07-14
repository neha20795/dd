var express = require("express");
var routes = express.Router();
var mongo = require("mongodb");
var Confidentialinformation = require("../../models/confidentialinformation");
var ConfidentialinformationEvaluation = require("../../models/confidentialinformationevaluation");

routes.get("/:email", function(req, res) {
console.log(req.params.email);
var email = req.params.email;

    Confidentialinformation.find( { confidentialid : email}, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Error!!!!!';
            return res.status(401).send({success : false,msg,});
        }
        else {
            console.log(result);
            if(result.length>=1)
            {
                ConfidentialinformationEvaluation.find({confidentialid : email}, function(err, result1)
                {
                    if(err){
                        console.log(err);
                    }
                    else
                    {
                        console.log(result1);
                            if(result1.length>=1)
                            {
                                    var detail = {
                                        maininformation : result[0],
                                        information : result1[0]
                                    }
                                    msg = 'Found!!!!!';
                                    return res.status(200).send({success : true,msg,detail});
                            }
                            else{
                                    msg = 'Unable to Fetch';
                                    return res.status(200).send({success : true,msg,});
                            }
                    }
                });
            }

        }

    });
});


module.exports=routes;

/*
if(result1.length>=1)
                    {
                                   var detail = {
                                       maininformation : result[x],
                                       information : result1[x]
                                   }
                    msg = 'Found!!!!!';
                                                    return res.status(200).send({
                                                        success : true,
                                                        msg,
                                                        detail
                                                    });

                }
                else{
                            msg = 'Something went wrong';
                            return res.status(200).send({
                                success : true,
                                msg,
                            });
                    } */
