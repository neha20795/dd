var express = require("express");
var routes = express.Router();

routes.use("/", require("./signup")); //for signup
routes.use("/login", require("./login")); //for login
routes.use("/search", require("./search")); //for search
routes.use("/detail", require("./detail")); //employee find by id
routes.use("/update", require("./update")); //update fetch and updating
routes.use("/allemployerdetail", require("./data")); // allemployeedetails
routes.use("/addimage",require("./image")); // updating image
routes.use("/employerinfo", require("./info")); //single data
routes.use("/addmore", require("./addmore"));
routes.use("/getlist/getdetail", require("./getList"));
routes.use("/forgotpassword", require("./forgotpassword"));
routes.use("/changepassword", require("./changepassword"));

module.exports=routes;