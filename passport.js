const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const userModel = require('./models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'secret'
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await userModel.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }

}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'

}, async (email, password, done) => {
    
    try {
        const user = await userModel.findOne({ "local.email": email });

        // if not, handdle it
        if (!user) {
            return done(null, false);
        }
        
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    }

}));