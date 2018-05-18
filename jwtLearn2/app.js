

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
    email : 'abc@test.com',
    password: 'abc'
}

function myfn(req, res) {
    console.log("REQUEST : ", req)
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

passport.use(new jwtStrategy(opts, function (jwtpload, done) {
    
    
    console.log("JWT DATA : ", jwtpload)

    if(user.email == jwtpload.emailId){
        return done(null, user)
        
    }
        else{

        return done(null,false,{message : "Hello there"})
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


app.post('/',
    // console.log("HERE ME OUT!")
    passport.authenticate('jwt'), function (req, res) {
        console.log("REQUEST.BODY : ", req.headers)
    }
)

app.post('/success', myfn)

app.post('/failure', function (req, res) {
    console.log("IN FAILURE")
})
app.listen(8005, function () {
    console.log("JWTLEARN SERVER STARTED IN PORT 8005")
})

/*
, {
    successRedirect: '/success',
    failureRedirect: '/failure'
}
*/