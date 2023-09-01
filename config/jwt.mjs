import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByIdModel } from '../models/UserModel.mjs';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, 
};

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  // Find the user by the ID in the JWT payload 
   console.log(jwtPayload)

  getUserByIdModel(jwtPayload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => done(err, false));
}));
