const express = require("express");
const router = express.Router();
const app = express();
var fs = require("fs");
app.use(express.static(__dirname + "/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// Setting up the router
//const router = express.Router();

// router.use('/', (request ,response , next)=>{

//  response.redirect('doctorlogin.html');

// });

app.get("/", function (request, response) {
  response.render("login.html");
});

module.exports = app;
