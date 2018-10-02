var express = require('express');
var Client = require('../models/client');
var bcrypt = require('bcrypt');

var router = express();


router.post('/', function(req, res, next) {
    var client = req.body;
    if(client.password) client.password = bcrypt.hashSync(client.password, bcrypt.genSaltSync(8), null);
    new Client(req.body).save().then((user) => {
        res.send(user);
    });
});

router.put('/',function(req, res, next) {
    var client = req.body;
    if(client.password) client.password = bcrypt.hashSync(client.password, bcrypt.genSaltSync(8), null);
    new Client(req.body).save().then((user) => {
        res.send(user);
    });
});

router.get('/:id', function(req,res) {
    var id = req.params.id;

    Client.findById(id).lean().exec().then(function(client) {
        if(!client) {
            return res.status(404).send('user not found!');
        }

        return res.send(client);
    });
});

router.get('/', function(req,res) {
    Client.find({}).lean().exec().then(function(clients){
        return res.send(clients);
    });
});

router.delete('/:id', function(req,res) {
    var id = req.params.id;

    Client.findByIdAndRemove(id).lean().exec().then(function(client) {
        if(!client) {
            return res.status(404).send('user not found!');
        }

        return res.send(client);
    });
});

router.post('/profile', function(req, res) {
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+'/../uploads/profile.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

module.exports = router;