var express = require("express");
var routes = express.Router();
var mongo = require("mongodb");
var Confidentialinformation = require("../../models/confidentialinformationrequest");
var ConfDetailReq = require("../../models/confidentialinformationdeleterequest");


// routes.delete("/:id", function (req, res) {
//     Confidentialinformation.delete({_id : mongo.ObjectId(req.params.id)} , function (err, result) {
//         if(err){
//             console.log(err);
//             msg = 'Error Occured';
//             return res.status(401).send({
//                 success : false,
//                 msg
//             });
//         }
//         else {
//             console.log(result);
//             msg = 'Data Inserted';
//             return res.status(200).send({
//                 success : true,
//                 msg
//             });
//         }
//     })
// });
routes.delete("/:id", function (req, res) {
    ConfDetailReq.insert({confidentialid : req.params.id}, function (err, result) {
        if(err){
            console.log(err);
            msg = 'Error Occured';
            return res.status(401).send({
                success : false,
                msg
            });
        }
        else {
            console.log(result);
            msg = 'Request Generated';
            return res.status(200).send({
                success : true,
                msg
            });
        }
    })
});



module.exports=routes;