const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5005
const app = express()
app.use(cors())
app.use(bodyParser.json());

collection = require( './mongo' ); // import mongo.js
var ObjectID = require('mongodb').ObjectID;
const colName = "todo"

// get all todo items
app.get('/items', function (req, res) {
  console.log("get all data")
  collection(colName).find().sort().toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length)
    res.send(result)
  })
})

// add new item
app.post('/items', function (req, res) {
  var query = req.body;
  console.log(query)
  collection(colName).insertOne(query, function(err, result) {
    if (err) throw err;
    console.log("1 document inserted");
    res.send(result.value)
  });
}); 

// done todo item
app.put('/items/:_id', function (req, res) {
  var query = { _id: ObjectID(req.params._id)};
  collection(colName)
  .findOneAndUpdate(query, { $set: { done : true } }, {returnOriginal: false}, function(err, result) {
    if (err) throw err;
    console.log("1 document changed")
    res.send(result.value)
  });
}); 

// delete todo item
app.delete('/items', function (req, res) {
  var query = { _id: ObjectID(req.body._id)};
  collection(colName).deleteOne(query, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    res.send("1 item was deleted")
  });
}); 


app.listen(port, () => console.log(`Example app listening on port ${port}!`))