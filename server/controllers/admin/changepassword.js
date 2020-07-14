var express = require("express");
var routes = express.Router();
var Admin = require("../../models/admin");
var sha1 = require("sha1");

routes.post("/", function(req, res){
    var e = req.body.username;
    var password = req.body.currentpassword;
    var newPassword = req.body.newpassword
    Admin.find({ username : e}, function(err, result){
        if(err){
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            if(result[0].password == sha1(password))
            {
                Admin.update({ username : e }, { $set : {password: newPassword }}, function (err, result1) {
                    if(err){
                        msg = 'Something went wrong';
                        return res.status(401).send({
                            success : false,
                            msg
                        });
                    }
                    else{
                        console.log(result1);
                        msg = 'Updated';
                        return res.status(200).send({
                            success : true,
                            msg
                        });
                    }
                })
            }
            else{
                msg = 'Wrong Password';
                return res.status(401).send({
                    success : false,
                    msg
                });
            }
        }
    });

});

module.exports=routes;