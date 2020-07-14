var connect = require("../config/connect");
var dbase = "reviewsystem";
var collec = "confidentialinformationrequest";

// var ObjectId = require("mongodb").ObjectId;
module.exports.find=function(where, cb){
    console.log(where);
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).find(where).toArray(cb);
    });
}

module.exports.update=function(where, obj, cb){
    console.log(where);
    console.log("Object "+obj);
    connect(function (err, client) {

        var db = client.db(dbase);
        db.collection(collec).updateOne(where, {$set : obj}, cb)
    });
}

module.exports.updateEmployeeStatus=function(where, obj, cb){
    console.log(obj)
    connect(function (err, client) {
        console.log(obj);
        var db = client.db(dbase);
        db.collection(collec).updateOne(where, {$set : obj}, cb)
    });
}
module.exports.updateEmployerStatus=function(where, obj, cb){
    console.log(obj)
    connect(function (err, client) {
        console.log(obj);
        var db = client.db(dbase);
        db.collection(collec).updateOne(where, {$set : obj }, cb)
    });
}

module.exports.delete=function(where, cb){
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).remove(where, cb);

    });
}
module.exports.insert=function(obj, cb){
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).insertOne(obj, cb);

    });
}

module.exports.findbyid = function(where, obj, cb){
    console.log(where);
    console.log(obj);
    connect(function (err, client) {
        var db = client.db(dbase);
        // db.collection(collec).find(where).toArray(cb);
         db.collection(collec).updateOne(where,{$set : obj }, { upsert: true } ,cb)
    });
}
module.exports.lookupConfidentialInfo = function (where, cb) {
    console.log(where);
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).aggregate(
            [ { $lookup :
                    {   from : "employer",
                        localField : "SenderemailId",
                        foreignField : "email",
                        as : "sender"
                    }
            },
                {$unwind : "$sender"},
                { $lookup :
                        { from : "employer",
                            localField : "ReceiverName",
                            foreignField : "email",
                            as : "receiver"
                        }
                },
                {$unwind : "$receiver"},
                {$lookup :
                        { from : "employee",
                            localField : "EmployeeEmail",
                            foreignField : "email",
                            as : "employee"
                        }
                },
                {$unwind : "$employee"},
                {$project :
                        { SenderemailId : 1,
                            ReceiverName : 1,
                            EmployeeEmail : 1,
                            SenderStatus : 1,
                            ReceiverStatus : 1,
                            EmployeeStatus : 1 ,
                            sendername : "$sender.organization_name",
                            receivername : "$receiver.organization_name",
                            employeename :{ $concat : [ "$employee.fname", " ", "$employee.lname"]}
                        }
                },
                {
                    $match : where
                }
            ]
        ).toArray(cb);
    })
}