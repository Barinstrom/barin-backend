const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userService = require("../services/users");
require("dotenv").config();

module.exports = (passport) => {
   var opts = {};
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = process.env.SECRET;

   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         //console.log(jwt_payload);
         userService
            .getUserWithoutPassword(jwt_payload._id)
            .then((user) => {
               if (user) {
                  return done(null, user);
               } else {
                  return done(null, false);
               }
            })
            .catch((error) => {
               return done(err, false);
            });
      })
   );
};
