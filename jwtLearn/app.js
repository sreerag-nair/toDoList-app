

var key = '4F7B5BF51329D01AB51430575797C66B'
var express = require('express');
var app = express();
var b = require('body-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwttoken = require('jsonwebtoken')
var bodyparser = require('body-parser')
var jwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;


app.use(bodyparser.json())
app.use(passport.initialize())
// app.use(passport.session())


var user = {
    // email: 'sree',
    email: 'sree@test.com',
    password: 'f6df658491720165c5d6c2afb1d0b75030eb807d323c7a1842a31c5794086c8d'
}


passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (user, done) {
    done(err, user)
})

var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '4F7B5BF51329D01AB51430575797C66B';
opts.algorithms = 'HS256 ';

passport.use(new jwtStrategy(opts, function (jwtpload, done) {


    console.log("JWT DATA : ", jwtpload)

    if (user.email == jwtpload.emailId) {
        console.log("VALID")
        return done(null, user)
    }
    else {
        console.log("INVALID")
        return done({ message: "Hello there" })
        // return done(null, false, { message: "Hello there" })
    }



}))


//THIS WORKS!!
passport.use('testUse', new LocalStrategy({
    // testUse is the name of the custom-strategy 
    usernameField: 'emailId',
    passwordField: 'password',
    //passReqToCallback: true // to pass back the entire request to the callback
}, function (email, password, done) {
    // console.log(req);
    console.log(jwtStrategy.fromAuthHeaderAsBearerToken())
    console.log(email);
    console.log(password);
    // console.log(done);
    if (email == user.email) {
        return done(null, user)
    }
    else {
        return done(null, false, { message: 'HJGHBH' })
    }
}))


app.post('/', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {

        if (err) {      // err is set if any exception occurs
            return req.json({ error: err });
        }
        if (user)    // the user object is set to false if the authentication fails
            return res.json({ message: "SUCCESS" });
        else
            return res.json({ message: "FAILURE" });
    })(req, res, next);
})


app.post('/failure', function (req, res) {
    console.log("IN FAILURE")
})
app.listen(8005, function () {
    console.log("JWTLEARN SERVER STARTED IN PORT 8005")
})

/*
//CUSTOM CALLBACK
app.post('/', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {

        if (err) {      // err is set if any exception occurs
            return req.json({ error: err });
        }
        if (user)    // the user object is set to false if the authentication fails
            return res.json({ message: "SUCCESS" });
        else
            return res.json({ message: "FAILURE" });
    })(req, res, next);
})
*/


/*
//WORKING STOCK AUTHENTICATION
app.post('/',
    passport.authenticate('jwt', {
        session : false,
    }), function (req, res) {
        console.log("REQUEST.BODY : ", req.body)
    }
)

*/


// LINKS -----------------------------
// http://www.passportjs.org/docs/downloads/html/   - custom callback section
// 
// 
// 
// ----------------------------