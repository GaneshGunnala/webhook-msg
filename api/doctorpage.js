const express = require('express')
const router = express.Router()
const  app = express();

var fs = require('fs');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Setting up the router
//const router = express.Router();
var obj = JSON.parse(fs.readFileSync('doclist.json', 'utf8'));
//console.log(obj);


// router.use('/', (request ,response , next)=>{

//  response.redirect('doctorlogin.html');

// });
//int this page we check the form data with database data and let him login
app.post('/', urlencodedParser, (req, res, next) => {
    console.log("This is for doctor.js")

    //got doctor form data here in req.body
    //console.log(req.body);
    var docname = req.body.uname;
    var docid = req.body.docid;
    var count=0

    //compare docid and docname from data of monogod
	for(var i=0;i<obj.doctors.length;i++){
    console.log(typeof obj.doctors[i].Docname);
		if(obj.doctors[i].Docname===req.body.uname && obj.doctors[i].docid===req.body.docid ){
			console.log("hey there");

			count++;
			console.log(count);
			break;
		}
	}
	if(count==0){
		res.write("Wrong credentials");
		res.end();

	}	
	else{
	////Sending slack message

	const https = require('https');

const yourWebHookURL = 'https://hooks.slack.com/services/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'; // PUT YOUR WEBHOOK URL HERE
const data={
	"text": "Doctor "+docname+" has arrived at the hospital"
};
	function sendSlackMessage (webhookURL, messageBody) {
  // make sure the incoming message body can be parsed into valid JSON
  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }

  // Promisify the https.request
  return new Promise((resolve, reject) => {
    // general request options, we defined that it's a POST request and content is JSON
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };

    // actual request
    const req = https.request(webhookURL, requestOptions, (res) => {
      let response = '';


      res.on('data', (d) => {
        response += d;
      });

      // response finished, resolve the promise with data
      res.on('end', () => {
        resolve(response);
      })
    });

    // there was an error, reject the promise
    req.on('error', (e) => {
      reject(e);
    });

    // send our message body (was parsed to JSON beforehand)
    req.write(messageBody);
    req.end();
  });
}

// main
(async function () {
  if (!yourWebHookURL) {
    console.error('Please fill in your Webhook URL');
  }

  console.log('Sending slack message');
  try {
    const slackResponse = await sendSlackMessage(yourWebHookURL, data);
    console.log('Message response', slackResponse);
  } catch (e) {
    console.error('There was a error with the request', e);
  }
})();
	////

    ////doctors dashboard must be displayed here
    res.render('doctordashboard.ejs',{ doctordetails: req.body});
    
   }

})





module.exports = app;