

var key = '4F7B5BF51329D01AB51430575797C66B'
var express = require('express');
var app = express();
var b = require('body-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwttoken = require('jsonwebtoken')
var bodyparser = require('body-parser')

app.use(bodyparser.json())

var user = {
    email: 'sree',
    password: 'abc'
}

function myfn(req,res){
    console.log("REQUEST : " , req)
}

passport.use('testUse', new LocalStrategy({
    // testUse is the name of the custom-strategy 
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, function (req, email, password, done) {
    // console.log(email);
    // console.log(user.email);
    if (email == user.email) {
        return done(null, "User found!")
    }
    else{
        return done(null,false)
    }
}))

function s() {
    console.log("SUCCESS")
}
function f() {
    console.log("FAILURE!")
}

app.post('/signup', passport.authenticate('testUse', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}), function (req, res) {
    console.log(req.body)
})

app.post('/success', myfn)

app.post('/failure', function (req, res) {
    console.log("IN FAILURE")
})
app.listen(8005, function () {
    console.log("JWTLEARN SERVER STARTED IN PORT 8005")
})