var express = require("express");
var routes = express.Router();
var EmpReview = require("../../models/employeetoemployee");
routes.post("/", function(req, res){
    console.log("Inside employee to employee ---"+req.body)

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

routes.get("/giver/:name", function(req, res){
    var name = req.params.name;
    console.log("inside employetoemployee giver");

    console.log(name)
    EmpReview.find({ empidgiver : name}, function(err, result){
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
                for(var x=0;x<result.length;x++)
                {
                    var detail1 = {
                        good:result[x].good ,
                        bad:result[x].bad ,
                        position:result[x].position ,
                        rating: result[x].rating,
                        empidreciever : result[x].empidreciever
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
    console.log("inside employetoemployee receiver");

    console.log(name)
    EmpReview.find({ empidreciever : name}, function(err, result){
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
                for(var x=0;x<result.length;x++)
                {
                    var detail1 = {
                        good:result[x].good ,
                        bad:result[x].bad ,
                        position:result[x].position ,
                        rating: result[x].rating,
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
routes.get("/:name", function(req, res){
    var name = req.params.name;
    EmpReview.find({ empidreciever : name}, function(err, result){
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
                for(var x=0;x<result.length;x++)
                {
                    var detail1 = {
                        good:result[x].fname ,
                        bad:result[x].lname ,
                        position:result[x].email ,
                        rating: result[x].address,
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