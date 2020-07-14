var express = require("express");
var routes = express.Router();
var Lookup = require("../../models/lookupquery");
// routes.use("/employeetoemployee", require("./employeetoemployee"));
routes.get("/:email", function (req, res) {
    var em = req.params.email;
    Lookup.lookupConfidentialInfo({ $and : [ { EmployeeEmail : em}, { EmployeeStatus : false}]}, function (err, result) {
        if(err){
            console.log("="+err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log(result[0]);
            msg = 'succesfully Added';
            return res.status(200).send({
                success : true,
                msg
            });
        }
    })
});
routes.get("/check/:email", function (req, res) {
    Lookup.lookupEmployerList({email : req.params.email} , function (err, result) {
        if(err){
            console.log("="+err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log(result);
            detail = result;
            msg = 'succesfully Added';
            return res.status(200).send({
                success : true,
                msg,
                detail
            });
        }
    })
});
routes.get("/review/:email", function (req, res) {
    Lookup.lookupConfidentialInfo({email : req.params.email} , function (err, result) {
        if(err){
            console.log("="+err);
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log(result);
            detail = result;
            msg = 'succesfully Added';
            return res.status(200).send({
                success : true,
                msg
            });
        }
    })
});
routes.get("/average/:name", function(request , response){
    var name =  request.params.name;
    Lookup.ratingaverage( { empidreciever : name }, function(err, result){
        if(err){
            console.log(err)
            response.status(401).send({
                success : false,
                msg : "Search for relevant info"
            });
        }
        else{
            console.log(result);
            if(result.length>=1){
                Lookup.ratingaverage2( { empid : name }, function(err, result1){
                    if(err){
                        console.log(err)
                        response.status(401).send({
                            success : false,
                            msg : "Search for relevant info"
                        });
                    }
                    else{
                        console.log(result1);
                        if(result1.length>=1){
                            console.log(result[0].RatingAverage+result1[0].RatingAverage);
                            var averageRating = (result[0].RatingAverage+result1[0].RatingAverage)/2;
                            response.status(200).send({
                                success : true,
                                msg : "Data Found",
                                averageRating
                            });
                        }
                        else{
                            response.status(200).send({
                                success : true,
                                msg : "Data Not Found"
                            });
                        }

                    }
                });
            }
            else{
                response.status(200).send({
                    success : true,
                    msg : "Data Not Found"
                });
            }

        }
    })
})
module.exports=routes;