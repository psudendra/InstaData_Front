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
		\
		<link href="http://fonts.googleapis.com/css?family=Lato:400,700|Kaushan+Script|Montserrat" rel="stylesheet" type="text/css">\
		<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/CUBigDataClass/Insta_Data/master/webpage/css/style.css">\
		<script type="text/javascript" src="https://cdn.rawgit.com/CUBigDataClass/Insta_Data/master/webpage/js/modernizr.js"></script>\
		\
		<title>InstaData</title>\
		<style>\
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
		\
		</head>\
		\
		<body>\
		<header>\
        <img src="https://cdn.rawgit.com/CUBigDataClass/Insta_Data/master/webpage/images/mountains.jpg" alt="Mountains">\
        <div class="name fancy-font">\
            The Force\
        </div>\
        <div class="titles">\
            <h1>Hello! <span>Welcome to our page!</span></h1>\
            <h2>Check out the most popular instagrams.</h2>\
        </div>\
        <div class="social">\
            <a class="facebook" href="#">Facebook</a>\
            <a class="twitter" href="#">Twitter</a>\
            <a class="instagram" href="#">Instagram</a>\
        </div>\
    </header>\
    <section class="instagram-wrap">\
        <div class="container">\
            <div class="row">\
                <div class="col-xs-12">\
                    <div class="instagram-content">\
                        <div class="row photos-wrap">';

		var bottom_body = '\
		<br><br><br>\
		</div>\
		</div>\
		</div>\
        </div>\
    </section>\
		<footer>\
        <div class="container">\
            <div class="row">\
                <div class="col-xs-12">\
                <h4>Get in touch</h4>\
                <p class="about-text">This website is being designed for our Big Data class at the University of Colorado. If you would like to get in touch with the team click the button below.</p>\
                <a class="contact-now-btn" href="#">Contact Now</a>\
                </div>\
            </div>\
        </div>\
    </footer>\
    <section class="footer-bottom">\
        2015 &copy;. All rights reserved.\
    </section>\
    \
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>\
    <script type="text/javascript" src="https://cdn.rawgit.com/CUBigDataClass/Insta_Data/master/webpage/js/bootstrap.js"></script>';

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

		 		var current = db.collection('current');
		 		var posts = db.collection('posts2');

		 		var collection = db.collection('current');

		 		//var result = [];

		 		collection.findOne({},function (err, result) {
		 			if (err) {
		 				console.log(err);
		 			}

		 			else if (result) {

				  		response.write('<h3>Most Popular Tag: ' + result["tag"] + '</h3>');

		 				for (var i=0; i<result.current.length; i++) {
		 					//console.log(result['current'][i][2]);

				  			response.write('<span class="image"><img src="' + result['current'][i]['imageurl'] + '">' + 
				  				'<br>Username: <a href="http://instagram.com/' + result['current'][i]["username"] + '">' + result['current'][i]["username"] + '</a>' +
				  				'<br># of Likes: ' + result['current'][i]["likes"] + '</span>');
				  		}
				  		response.write(bottom_body);

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
