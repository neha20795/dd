var connect = require("../config/connect");
var dbase = "reviewsystem";
var collec = "employee";
var collec3 ="employeetoemployee";
var collec4 ="employertoemployee";
module.exports.find=function(where, cb){
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).find(where).toArray(cb);
    });
}

module.exports.update=function(where, obj, cb){
    console.log(where);
    console.log(obj);
    connect(function (err, client) {

        var db = client.db(dbase);
        db.collection(collec).updateOne(where, {$set : obj}, cb)
    });
}

module.exports.updateImage=function(where, obj, cb){
    connect(function (err, client) {
        console.log(obj.image);
        var db = client.db(dbase);
        db.collection(collec).updateOne(where, {$addToSet : {image : {$each : [ obj.image ]}}}, cb)
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