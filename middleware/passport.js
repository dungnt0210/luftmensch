const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Adminer = require("../model/Adminer");
const Customer = require("../model/Customer");
const SECRET = process.env.SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = passport => {
   passport.use('admin-permission',
      new JwtStrategy(opts, (jwt_payload, done) => {
         Adminer.findOne({ _id: jwt_payload.adminId })
            .then(adminer => {
               if (adminer) {
                  return done(null, adminer);
               } else {
                  return done(null, false, {message: 'Admin not found'});
               }
            })
            .catch(err =>
               console.log({ error: "Error authenticating the user" })
            );
      })
   );
   passport.use('customer-permission',
        new JwtStrategy(opts, (jwt_payload, done) => {
            Customer.findOne({ _id: jwt_payload.customerId })
            .then(customer => {
                if (customer) {
                    return done(null, customer);
                } else {
                    return done(null, false, {message: 'Customer not found'});
                }
            })
            .catch(err =>
                console.log({ error: "Error authenticating the user" })
            );
        })
   );
};
