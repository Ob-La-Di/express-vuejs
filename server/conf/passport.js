var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var passportJWT = require("passport-jwt");
var JWTStrategy   = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var Client = require('../models/client');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        return Client.findOne({email: email}).lean().exec()
           .then(function(user) {
               if (!user || !bcrypt.compareSync(password, user.password)) {
                   return cb(null, false, {message: 'invalid email or password.'});
               }

               return cb(null, user, {message: 'success'});
          })
          .catch(function(err) {cb(err);});
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        return Client.findById(jwtPayload._id)
            .then(function(user) {
                return cb(null, user);
            })
            .catch(function(err) {
                return cb(err);
            });
    }
    ));