const express = require('express'),
			request=	require('request')
const router = express.Router()
const  app = express();
// Setting up the router
//const router = express.Router();

router.get('/' , (request ,response , next)=>{
	console.log("At index.js");
	//response.render('index.html');
});







module.exports = app;
