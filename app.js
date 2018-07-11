var express = require('express');
var http = require('https');
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/project';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Entidad = mongoose.Schema({
    name: String,
    uri: String,
    uid: String
});

var Institution = mongoose.model('institution', Entidad, 'entidad');


app.get('/request_official_json', function (req, res) {
    var options = {
        name: 'ACT',
        host: 'collections.ala.org.au',
        path: '/ws/institution'
    };
    var body
    var req = http.get(options, function(response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('DATA: ');
        var bodyChunks = [];
        var body;
        response.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function() {
            body = ""+Buffer.concat(bodyChunks);
            // ...and/or process the entire body here.
                console.log("Connection Successful!");
                // compile schema to model
                // documents array
                var institutions = JSON.parse(body);
                // save multiple documents to the collection referenced by Book Model
                Institution.collection.insert(institutions, function (err, docs) {
                  if (err){ 
                      return console.error(err);
                  } else {
                    console.log("Multiple documents inserted to Collection");
                  }
                });
            res.status(200).send(body);
        })

    });

    req.on('error', function(e) {
      console.log('ERROR: ' + e.message);
    });

});

app.get("/", function (req, res) {
    res.status(200).send({ message: 'Bienvenido a nuestro restful API, para ver los JSON hacer /institutions' });
});

app.get("/institutions", function (req, res) {
    Institution.find({}, function (err, result) {
        if (err) return handleError(err);
        res.status(200).send(result);

        // 'result' contains the list of  all the institutions.
    })
});

app.get("/institutions/uid/:num", function (req, res) {
    var num = req.params.num;
    Institution.find({ 'uid': num }, function (err, result) {
        if (err) return handleError(err);
        res.status(200).send(result);
        // 'result' contains the list of institutions that match the criteria.
    })
});

app.get("/institutions/name/:name", function (req, res) {
    var name = req.params.name;
    Institution.find({ 'name': name }, function (err, result) {
        if (err) return handleError(err);
        res.status(200).send(result);
        // 'result' contains the list of institutions that match the criteria.
    })
});

app.get("/institutions/uri", function (req, res) {
    var url = req.query.url;
    console.log(url);
    Institution.find({ 'uri': url }, function (err, result) {
        if (err) return handleError(err);
        res.status(200).send(result);
        // 'result' contains the list of institutions that match the criteria.
    })
});
 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
