var express = require("express");
var routes = express.Router();

routes.use("/", require("../controllers/employee/index"));
routes.use("/employer", require("../controllers/employer/index"));
routes.use("/imageupload", require("../controllers/imageupload/index"));
routes.use("/review",require("../controllers/review/index"));
routes.use("/confidentialinformation", require("../controllers/confidentialinformation/index"));
routes.use("/admin", require("../controllers/admin/index"));
routes.use("/lookup", require("../controllers/lookupcheck/index"));
routes.use("/contactus", require("../controllers/contactus/index"));
module.exports=routes;