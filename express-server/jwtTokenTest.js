var jwt = require('jsonwebtoken')
var passport = require('passport');
var passport_local = require('passport-local').Strategy
var key = '4F7B5BF51329D01AB51430575797C66B'
var express = require('express');
var app = express();
var bp = require('body-parser')

var user = {
    name: "sreerag",
    pwd: "qwerty"
}

app.use(bp.json())


passport.use(new passport_local(
    function (u, p, done) {
        if (!u || !p)
            return done(null, false, { message: "Wrong boy!!!" })

        return done(null, { message: "OK!!!" })

    }
))

app.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res) {
    console.log("RECVD!!!")
})


app.listen(8001, function () {
    console.log("SERVER STARTED IN 8001...")
})


/********************************************************************/
// https://blog.jscrambler.com/implementing-jwt-using-passport/
// https://javascript.info/async-await
// https://www.npmjs.com/package/jsonwebtoken
// 

/********************************************************************/
