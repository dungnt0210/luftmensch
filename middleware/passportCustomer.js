const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Customer = require("../model/Customer");
const SECRET = process.env.SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = passportCustomer => {
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         Customer.findOne({ _id: jwt_payload.id })
            .then(customer => {
               if (customer) {
                  return done(null, customer);
               } else {
                  return done(null, false);
               }
            })
            .catch(err =>
               console.log({ error: "Error authenticating the user" })
            );
      })
   );
};
