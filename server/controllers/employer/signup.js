var express = require("express");
var routes = express.Router();
var Employer = require("../../models/employer");
var sha1 = require("sha1");

routes.post("/", function(req, res){
    console.log("Inside Employer");
    console.log(req.body);
    var e = req.body.email;

    Employer.find({email : e}, function(err, result){
        console.log(result);
        if(err){
            console.log("Error Find")
            msg = 'Something went wrong';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else if(result.length == 1)
        {
            console.log("Result Length")
            msg = 'User Already Exists';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else{
            console.log("in");
            req.body.password = sha1(req.body.password);
            Employer.insert(req.body, function(err, result){
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

routes.get("/:name", function (req, res) {
    var name = req.params.name;
  Employer.find({organization_name : name}, function (err, result) {
      if(err){
          msg = 'Something went wrong';
          return res.status(401).send({
              success : false,
              msg
          });
      }
      else{

          if(result.length>=1){
              employerid = result[0].email;
              msg = 'Your have signed-up succesfully';
              return res.status(200).send({
                  success : true,
                  msg
              });
          }
          else{
              msg = 'data not founding';
              return res.status(200).send({
                  success : true,
                  msg
              });
          }
      }
  })
})
module.exports=routes;