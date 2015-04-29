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
		.image-wrapper{\
			margin:auto 0;\
			text-align:center;\
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
            <h1>Hello, <span>Welcome to InstaData!</span></h1>\
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
	            <p class="about-text">\
	            	<br><br>\
	            	This project was done as a part of the Big Data course at the University of Colorado. We hoped to learn how the Instagram API worked and challenge ourselves to create a feature that is missing from the app itself. With these goals in mind, we decided to analyze Instagram data to find the most popular hashtags as well as the most liked pictures using those hashtags.\
	            	<br><br>\
	            	\
	            	The entire application is hosted on an Amazon EC2 instance. We used python for our back-end scripts which get and parse data directly from the Instagram API. We collected recent media through our Mongo database and have another script parse this data to find the most used hashtag of the moment. This script also finds the most liked pictures which use that hashtag. For the front-end, we used Node.js to query the data from Mongo and output it to the user. Since we are continuously collecting data, the tag and images change throughout the day.\
	            </p>\
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
                </div>\
                <a href="mailto:priya.sudendra@colorado.edu">Project Manager: Priya Sudendra</a><br></br>\
                <a href="mailto:rooneycm@colorado.edu">Front End Developer: Chris Rooney</a><br></br>\
                <a href="mailto:rowells@colorado.edu">Front End Developer: Steve Rowells</a><br></br>\
                <a href="mailto:rooneyk@colorado.edu">Front End Developer: Kyle Rooney</a><br></br>\
                <a href="mailto:nodi2451@colorado.edu">Back End Developer: Noah Dillon</a><br></br>\
                <a href="mailto:sheefali.tewari@colorado.edu">Back End Developer: Sheefali Tewari</a><br></br>\
            </div>\
            </div>\
        </div>\
    </footer>\
    <section class="footer-bottom">\
        2015 &copy; The Force. All rights reserved.\
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

				  		response.write('<h3>Most Popular Tag: ' + result["tag"] + '</h3><div class="image-wrapper">');

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
