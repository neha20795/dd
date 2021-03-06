var connect = require("../config/connect");
var dbase = "reviewsystem";
var collec = "employer";

module.exports.find=function(where, cb){
    console.log(where);
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
    console.log("employerImage-4")

    connect(function (err, client) {
        console.log(obj.image);
        var db = client.db(dbase);
        db.collection(collec).updateOne(where, {$addToSet : {photos : {$each : [ obj.image ]}}}, cb)
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

module.exports.lookupEmployerList = function(cb) {
    connect(function (err, client) {
        var db = client.db(dbase);
        db.collection(collec).distinct(
            "organization_name", cb
        );
    });
}