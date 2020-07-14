var express = require("express");
var routes = express.Router();
var Admin = require("../../models/admin");
var sha1 = require("sha1");

routes.post("/", function(req, res){
    var e = req.body.username;
    Admin.find({ username : e}, function(err, result){
        if(err){
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else if(result.length == 1)
        {
            msg = 'User Already Exists';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            req.body.password = sha1(req.body.password);
            Admin.insert(req.body, function(err, result){
                if(err){
                    msg = 'Something went wrong';
                    return res.status(401).send({
                        success : false,
                        msg
                    });
                }
                else{
                    msg = 'Your have signed-up succesfully';
                    return res.status(200).send({
                        success : true,
                        msg
                    });
                }
            });
        }
    });

});

module.exports=routes;