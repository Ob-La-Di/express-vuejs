var express = require('express');
var mongoose = require('mongoose');
var Client = require('./server/models/client');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var path = require('path');


mongoose.connect('mongodb://localhost:27017/wisebatt', function(err){
    if (err)
        console.error('ERROR CONNECTING TO MONGODB:', err);
});

var app = express();

app.use(fileUpload());

require('./server/conf/passport');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/v1/clients', require('./server/routes/clients'));
app.use('/v1/auth', require('./server/routes/auth'));
app.use('/v1/python', require('./server/routes/python'));
app.use('/v1/files', require('./server/routes/file'));
app.use(express.static(path.join(__dirname,'./client/dist')));

app.listen(8080, () => {
    console.log('listening on 8080');
});