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

    strReplaceAll = strText.replace( new RegExp( "[", "{", "imageurl" ), "" );
    alert( strReplaceSimple );

    // Insert some users
    var result = [];
    collection.find({},{imageurl:1, _id:0}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
	response.write(JSON.stringify(result));
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });
  }
});
});
    // Regex
  
// Point the HTTP server to port 50000.
server.listen( 50000 );
 
// For logging....
sys.puts( "Server is running on 50000" );
