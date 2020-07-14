var express = require("express");
var routes = express.Router();

routes.use("/", require("./employerone"));
routes.use("/employee",require("./employee"));
routes.use("/employertwo", require("./employertwo"));
routes.use("/addconfidentialinformation", require("./cofidentialinformationadd"));
routes.use("/deleterequest", require("./deleterequest"));
routes.use("/remove", require("./remove"));
routes.use("/accepted", require("./accepted"));
routes.use("/detail", require("./detail"));


module.exports=routes;