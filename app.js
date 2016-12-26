const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3050;

const app = express();


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// serve index.html as the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})


// Handle post request /reglookup
app.post("/reglookup", function(req, res){

	console.log(req.body);

	// Get Reg from request
	var reg = req.body.reg

	// send request to motorcheck api using that reg
	var url = "http://beta.motorcheck.ie/vehicle/reg/"+reg+"/identity/vin?_username=hubspot&_api_key=ee2a3d5b341f12a53e953e3ad5550de7dc1f9560";

	request(url, function(error, response, body) {

	  if(error){
	  	res.send('error:', error)
      return
	  }

	  res.send(body)

	});

})





app.listen(port);
