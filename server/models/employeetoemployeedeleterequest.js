var connect = require("../config/connect");
var dbase = "reviewsystem";
var collec = "employeetoemployerdeleterequest";

module.exports.find=function(where, cb){
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).find(where).toArray(cb);
    });
}

module.exports.update=function(where, obj, cb){
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
        db.collection(collec).aggregate([{ $match : where},{$group : { _id : "$empidreciever", RatingAverage : {$avg : "$rating"}}}]).toArray(cb);
    });
}
// db.employeetoemployee.aggregate( [ { $group :{ _id : "$empidreciever", RatingAverage : { $avg : "$rating" } } } ] );
// db.employeetoemployee.aggregate( [ { $match : {empidreciever : "vinita04@sharma.in" }}, { $group :{ _id : "$empidreciever", RatingAverage : { $avg : "$rating" } } } ] );