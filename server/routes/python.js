var express = require('express');
var python =  require('../services/python');

var router = express();

router.get('/', function(req, res) {
    python()
    .then(function(result) {
        return res.send(result);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

module.exports = router;