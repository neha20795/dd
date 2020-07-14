var express = require("express");
var routes = express.Router();
var Employer = require("../../models/employer");

routes.get("/", function (req, res) {
    console.log("inside for lokup")
    Employer.lookupEmployerList( function (err, result) {
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
            msg = 'List found';
            return res.status(200).send({
                success : true,
                msg,
                detail
            });
        }
    })
});
module.exports=routes;