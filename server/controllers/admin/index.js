var express = require("express");
var routes = express.Router();

routes.use("/", require("./login"));
routes.use("/addadmin", require("./add"));
routes.use("/employee", require("./employee/index"));
routes.use("/employer", require("./employer/index"));
routes.use("/review", require("./review/index"));
routes.use("/confidentialinfo", require("./confidentialinfo/index"));
routes.use("/changepassword", require("./changepassword"));
module.exports=routes;