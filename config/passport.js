const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwr_payload, done) =>{
        User.getUserById(jwr_payload.id, (err, user) => {
            //console.log(jwr_payload.id)
            if(err){
                return done(err, false);
            }
            if(user){
                console.log(user)
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
}