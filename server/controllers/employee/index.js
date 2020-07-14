var express = require("express");
var routes = express.Router();

routes.use("/", require("./signup")); //for signup
routes.use("/login", require("./login")); //for login
routes.use("/search", require("./search")); //for search by name
routes.use("/employeedetail", require("./detail")); //employee find by id
routes.use("/update", require("./update")); //update fetch and updating
routes.use("/allemployeedetail", require("./data")); // allemployeedetails
routes.use("/addimage",require("./image")); // updating image
routes.use("/detail", require("./detail"));//search by email
routes.use("/addmore", require("./addmore"));//search by email
routes.use("/forgotpassword", require("./forgotpassword"));
routes.use("/changepassword", require("./changepassword"));
module.exports=routes;