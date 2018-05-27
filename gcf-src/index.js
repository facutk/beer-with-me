const functions = require("firebase-functions");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const app = express();

const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();

const todoRoutes = require('./todos');
const authRoutes = require('./auth');
const config = require('./config');

app.use(cors({ origin: true }));
app.use(cookieParser());
app.disable("x-powered-by");



app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', todoRoutes);

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    const err = false;
    console.log('google strategy invoked');
    return done(err, profile);
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.cert
  }, function (jwtPayload, cb) {
    console.log('JWTStrategy fromAuthHeaderAsBearerToken', jwtPayload);
    const err = false;

    cb(err, jwtPayload);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.status(200)
    .send("Hello World");
});

app.get('/profile',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    res.status(200).json(req.user);
  }
);

app.get('/profileb',
  passport.authenticate('jwt'),
  function(req, res) {
    res.status(200).json(req.user);
  }
);

const hello = functions.https.onRequest(app);

module.exports = {
  hello
}
