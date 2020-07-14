/*
var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb+srv://neha20795:Neha@sharma@20@cluster0-amaee.mongodb.net/<dbname>?retryWrites=true&w=majority";
module.exports=function(cb){
    MongoClient.connect(dbUrl,{ useNewUrlParser: true,
        useUnifiedTopology: true}, cb);
}*/
var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017";

module.exports=function(cb){
    MongoClient.connect(dbUrl,{ useNewUrlParser: true,
        useUnifiedTopology: true}, cb);
}