var express = require("express");
var routes = express.Router();
var EmpReview = require("../../models/employeetoemployer");
routes.post("/", function(req, res){
    console.log("Inside employee to employer ---"+req.body)

    EmpReview.insert(req.body, function(err, result){
        if(err){
            msg = 'Something went wrong';
            return res.status(401).send({
                success : true,
                msg
            });
        }
        else{
            msg = 'succesfully Added';
            return res.status(200).send({
                success : true,
                msg
            });
        }
    });
});
routes.get("/:name", function(req, res){
    var name = req.params.name;
    EmpReview.find({orgid : name}, function(err, result){
        if(err){
            res.statusText = 'Something went wrong';
            return res.status(406);
        }
        else{
            console.log(result[0]);
            if(result.length >= 1)
            {
                var detail = new Array();
                console.log(result[0]);
                for(x=0;x<result.length;x++)
                {
                    var detail1 = {
                        pros:result[x].pros ,
                        cons:result[x].cons ,
                        rating:result[x].rating ,
                        type: result[x].type,
                       empid: result[x].empid
                    }
                    detail.push(detail1);
                }
                res.status(200).send({
                    success : true,
                    detail
                });
            }
            else{
                msg="no data found"
                res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    });
});
routes.get("/giver/:name", function(req, res){
    var name = req.params.name;
    console.log("inside employetoemployer giver");

    EmpReview.find({empid : name}, function(err, result){
        if(err){
            res.statusText = 'Something went wrong';
            return res.status(406);
        }
        else{
            console.log(result[0]);
            if(result.length >= 1)
            {
                var detail = new Array();
                console.log(result[0]);
                for(x=0;x<result.length;x++)
                    {
                        var detail1 = {
                            pros:result[x].pros ,
                            cons:result[x].cons,
                            rating:result[x].rating ,
                            type: result[x].type,
                            orgid: result[x].orgid
                        }
                        detail.push(detail1);
                    }
                    res.status(200).send({
                        success : true,
                        detail
                    });
            }
            else{
                msg="no data found"
                res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    });
});
routes.get("/receiver/:name", function(req, res){
    var name = req.params.name;
    console.log("inside employetoemployer giver");

    EmpReview.find({orgid: name}, function(err, result){
        if(err){
            res.statusText = 'Something went wrong';
            return res.status(406);
        }
        else{
            console.log(result[0]);
            if(result.length >= 1)
            {
                var detail = new Array();
                console.log(result[0]);
                for(x=0;x<result.length;x++)
                {
                    var detail1 = {
                        pros:result[x].pros ,
                        cons:result[x].cons,
                        rating:result[x].rating ,
                        type: result[x].type,
                    }
                    detail.push(detail1);
                }
                res.status(200).send({
                    success : true,
                    detail
                });
            }
            else{
                msg="no data found"
                res.status(200).send({
                    success : true,
                    msg
                });
            }
        }
    });
});

module.exports=routes;