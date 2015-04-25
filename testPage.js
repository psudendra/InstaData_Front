// Load the necessary servers.
var sys = require( "sys" );
var http = require( "http" );
 
// Create our HTTP server.
var server = http.createServer(
function( request, response ){

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/insta_data';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('posts');

    // Insert some users
    //var cursor = collection.find({},{imageurl:1, _id:0}); 
    //var results = [];
    //cursor.forEach(function(row){results.push(row.imageurl)});
    //console.log(results);
    //get_imageurl = function(doc) { return doc.imageurl; }
    var json = collection.find({},{imageurl:1, _id:0}).toArray().toJSON();
    console.log(json);
    collection.find({}, {imageurl:1, _id:0}).toArray(function(err, result){
	if (err){
		console.log(err);
		}
	else {
		//console.log(result[].imageurl);
		}
      //Close connection
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
