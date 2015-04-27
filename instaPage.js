// Load the necessary servers.
var sys = require( "sys" );
var http = require( "http" );
//var myRegex = /((([h]+[t]+[t]+[p])+(\S)+([j]+[p]+[g]))|(([h]+[t]+[t]+[p])+(\S)+([m]+[p]+[4])))/;

// Create our HTTP server.
var server = http.createServer(
	function( request, response ){
		response.writeHead(200, {"Content-Type" : "text/html"});

		var body = '\
		<html>\
		<head>\
		<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>\
		<style>\
		body {\
			margin: auto;\
			font: 14px Helvetica, Arial, sans-serif;\
			color:#0000FF;\
			text-align:center;\
		}\
		\
		a {\
			color: #00B7FF;\
		}\
		\
		img {\
			width: 200px;\
			padding: 10px;\
		}\
		\
		.image {\
			position:relative;\
			display:inline-block;\
		}\
		</style>\
		<title>InstaData</title>\
		</head>\
		\
		<body>\
		<h1>Welcome to InstaData!</h1>';

		response.write(body);

		//lets require/import the mongodb native drivers.
		var mongodb = require('mongodb');

		//We need to work with "MongoClient" interface in order to connect to a mongodb server.
		var MongoClient = mongodb.MongoClient;

		// Connection URL. This is where your mongodb server is running.
		var url = 'mongodb://ec2-52-10-211-62.us-west-2.compute.amazonaws.com/insta_data';

		// Use connect method to connect to the Server
		MongoClient.connect(url, function (err, db) {
			if (err) {
		 		console.log('Unable to connect to the mongoDB server. Error:', err);
		 	}

		 	else {
		 		//HURRAY!! We are connected. :)
		 		console.log('Connection established to', url);

		 		// Get the documents collection

		 		var collection = db.collection('current');

		 		//var result = [];

		 		collection.findOne({},function (err, result) {
		 			if (err) {
		 				console.log(err);
		 			}

		 			else if (result) {

				  		response.write(result["tag"] + '<br><br>');

		 				for (var i=0; i<result.current.length; i++) {
				  			response.write('<div class="image"><img src="' + result['current'][i][1] + '">' + '<br>' + "# of Likes: " + result['current'][i][0] + '</div>');
				  		}

				  		response.end();
				  	}

				  	else {
				  		console.log('No document(s) found with defined "find" criteria!');
				  	}

				  	db.close();
				});
		 	};
		});
	}
);

// Point the HTTP server to port 50000.
server.listen( 50000 );
 
// For logging....
sys.puts( "Server is running on 50000" );
