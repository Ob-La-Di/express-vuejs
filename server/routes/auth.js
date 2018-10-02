var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var router = express();

router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, function (err, user, info) {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }

       req.login(user, {session: false}, function (err) {
           if (err) {
               res.send(err);
           }


           var token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user: user, token: token});
        });
    })(req, res);
});

router.get('/check', passport.authenticate('jwt', {session: false}), function(req, res) {
    return res.send('success!');
})

module.exports = router;