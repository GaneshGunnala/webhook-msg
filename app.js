const http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const express = require('express')
const morgan = require('morgan')
const app = express();
app.use(express.static(__dirname + '/views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'))

//evi controllers ra mana files ni refer cheyali eviti tho 
const index = require('./api/index.js')
const login_as_doctor = require('./api/login_as_doctor.js')
const doctorpage = require('./api/doctorpage.js')
const logout = require('./api/logout.js')
//evi mount points ra , mana server ki a req hit aiynapudu aah req ni m cheyali ani chpthad evi
// app.use('/', index, (req, res, next) => {
//     console.log("This is for home page")
// })

app.use('/login_as_doctor', login_as_doctor, (req, res, next) => {
    console.log("This is for login_as_doctor.js")
})



app.use('/doctorpage', doctorpage, (req, res, next) => {
    console.log("doc page in appjs")
})

app.use('/logout', logout, (req, res, next) => {
    console.log("This is for login_as_doctor.js")
})
// app.use('/doctorpage', urlencodedParser, (req, res, next) => {
//     console.log("This is for doctor.js")
//     console.log(req.body);

//     res.render("index.html");
// })



app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
})

module.exports = app;