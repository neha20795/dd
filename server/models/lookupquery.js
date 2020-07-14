var connect = require("../config/connect");
var dbase = "reviewsystem";
var collec = "employee";
var collec2 = "confidentialinformationrequest";
var collec3 ="employeetoemployee";
var collec4 ="employertoemployee";
var collec5 = "employeetoemployer";
module.exports.lookupEmployer = function(where, cb) {
    console.log(where);
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).aggregate([

            {
                $lookup: {
                    from: "employer",
                    localField: "organization",
                    foreignField: "organization_name",
                    as: "Orginfo"
                }
            },
            { $unwind : "$Orginfo" },
            {
                $project :
                    {   "organization_name" : 1,
                        "Orginfo.organization_name" :1,
                        "Orginfo.email" :1,"organization":1,
                        "_id" : 1, "email" : 1
                    }
            },
            {
                $match : where
            },
        ]).toArray(cb);
    });
}
module.exports.lookupEmployerList = function(where, cb) {
    console.log(where);
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).distinct(
            "fname", cb
        );
    });
}
module.exports.lookupConfidentialInfo = function (where, cb) {
    console.log(where);
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec2).aggregate(
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
module.exports.ratingaverage = function (where, cb) {
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec3).aggregate([{ $match : where},{$group : { _id : "$empidreciever", RatingAverage : {$avg : "$rating"}}}]).toArray(cb);
    });
}
module.exports.ratingaverage2 = function (where, cb) {
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec4).aggregate([{ $match : where},{$group : { _id : "$empid", RatingAverage : {$avg : "$rating"}}}]).toArray(cb);
    });
}
module.exports.ratingaverage3 = function (where, cb) {
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec5).aggregate([{ $match : where},{$group : { _id : "$orgid", RatingAverage : {$avg : "$rating"}}}]).toArray(cb);
    });
}

/*
db.confidentialinformationrequest.aggregate(
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
        }
    ]).toArray();
*/
