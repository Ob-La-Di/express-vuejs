var express = require('express');
var streamBuffers = require('stream-buffers');
var csv = require('csv-parser');
var Client = require('../models/client');



var stream = require('stream');

// Initiate the source
var bufferStream = new stream.PassThrough();


var router = express();

router.post('/', function(req, res){
    var data = req.files.file.data;

    var bufferStream = new stream.PassThrough();

    bufferStream.end(data);

    var promises = [];
    bufferStream.pipe(csv()).on('data', function(data) {
        promises.push(new Client(data).save().then());
    }).on('end', function() {
        Promise.all(promises).then(function(result){
            res.send(result);
        });
    });
});


router.get('/', function(req, res) {
    var limit = req.query.limit || 10;
    
});

module.exports = router;