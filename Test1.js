<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <title>Big Data Instagram</title>
    <link href='http://fonts.googleapis.com/css?family=Lato:400,700|Kaushan+Script|Montserrat' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="js/modernizr.js"></script>
</head>
<body>
    <header>
        <img src="images/mountains.jpg" alt="Mountains">
        <div class="name fancy-font">
            The Force
        </div>
        <div class="titles">
            <h1>Credits Page!</h1>
            <h2>Priya Sudendra(priya.sudendra@colorado.edu) <br> <br> Sheefali Tewara(Sheefali.Tewari@colorado.edu) <br> <br> Chris Rooney(Rooneycm@colorado.edu) <br> <br> Steve Rowells(Rowells@colorado.edu) <br> <br> Kyle Rooney(Rooneyk@colorado.edu) <br> <br> Noah Dillon(Nodi2451@colorado.edu) </h2>
        </div>
        <div class="social">
            <a class="facebook" href="#">Facebook</a>
            <a class="twitter" href="#">Twitter</a>
            <a class="instagram" href="#">Instagram</a>
        </div>
    </header>
    <section class="instagram-wrap">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="instagram-content">
                        <h3>Popular Photos</h3>
                        <div class="row photos-wrap">
                        <!-- Instafeed target div -->
                        <div id="instafeed"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                <h4>Get in touch</h4>
                <p class="about-text">This website is being designed for our Big Data class at the University of Colorado. If you would like to get in touch with the team click the button below.</p>
                <a class="contact-now-btn" href="#">Contact Now</a>
                </div>
            </div>
        </div>
    </footer>
    <section class="footer-bottom">
        2015 &copy; Christopher Rooney. All rights reserved.
    </section>
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
		 		//var posts = db.collection('posts2');

		 		//var result = [];

		 		current.findOne({},function (err, result) {
		 			if (err) {
		 				console.log(err);
		 			}

		 			else if (result) {

				  		response.write(result["tag"] + '<br><br>');

		 				for (var i=0; i<result.current.length; i++) {
		 					//console.log(result['current'][i][2]);

				  			response.write('<div class="image"><img src="' + result['current'][i]['imageurl'] + '">' + 
				  				'<br>Username: <a href="http://instagram.com/' + result['current'][i]["username"] + '">' + result['current'][i]["username"] + '</a>' +
				  				'<br># of Likes: ' + result['current'][i]["likes"] + '</div>');
				  		}

				  		response.end();
				  	}

				  	else {
				  		console.log('No document(s) found with defined "find" criteria!');
				  	}

				  	db.close();
				});

				//console.log(stuff['current']);
		 	};
		});
	}
);

// Point the HTTP server to port 50000.
server.listen( 50000 );
 
// For logging....
sys.puts( "Server is running on 50000" );
    
</body>
</html>
