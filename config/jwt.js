const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getUserById } = require('../models/UserModel');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, 
};

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  // Find the user by the ID in the JWT payload 
   console.log(jwtPayload)

  getUserById(jwtPayload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => done(err, false));
}));
