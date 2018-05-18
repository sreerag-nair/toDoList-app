
var express = require('express');
var app = express();
var b = require('body-parser')
var passport =  require('passport');

const auth = require('./auth');
const user = require('./user');

require('./passport');


// app.use(b.urlencoded({extended : true}))
app.use(b.json())
app.use('/auth', auth)
app.use('/user', passport.authenticate('jwt', {session : false}), user);



app.listen(8005,function(){
    console.log("JWTLEARN SERVER STARTED IN PORT 8005")
})