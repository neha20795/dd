var express = require("express");
var routes = express.Router();
var EmpReview = require("../../models/employertoemployee");

routes.post("/", function(req, res){
    console.log("Inside employer to employee ---"+req.body)
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
    EmpReview.find({ empid : name }, function(err, result){
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
                            good : result[x].good ,
                            bad : result[x].bad ,
                            position : result[x].position ,
                            rating : result[x].rating,
                            review : result[x].review
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

//edit below code
routes.get("/giver/:name", function(req, res){
    console.log("inside employertoemployee giver");

    var name = req.params.name;
    EmpReview.find({ organizationid : name }, function(err, result){
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
                        good : result[x].good ,
                        bad : result[x].bad ,
                        position : result[x].position ,
                        rating : result[x].rating,
                        review : result[x].review,
                        empid : result[x].empid
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
    console.log("inside employer to employee receiver");

    var name = req.params.name;
    EmpReview.find({ empid : name }, function(err, result){
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
                        good : result[x].good ,
                        bad : result[x].bad ,
                        position : result[x].position ,
                        rating : result[x].rating,
                        review : result[x].review,
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