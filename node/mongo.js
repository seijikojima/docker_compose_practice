var dbo;
var MongoClient = require('mongodb').MongoClient;
const dbName = "todo"
const url = "mongodb://" + "mongo:27017/" + dbName

// Connect to the Serve
MongoClient.connect(url, function(err, db) {  
    console.log("Connected correctly to server");  
    dbo = db.db(dbName);
});

var collection = function( name ) {  
    return dbo.collection( name );
}

module.exports = collection;