var express = require("express");
var routes = express.Router();

routes.use("/employeetoemployee", require("./employeetoemployee"));
routes.use("/employeetoemployer", require("./employeetoemployer"));
routes.use("/employertoemployee", require("./employertoemployee"));

module.exports=routes;