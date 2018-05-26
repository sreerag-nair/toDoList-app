// var express = require('express')
const app = require('express')();

const generatorJWT = require('jsonwebtoken')

const key = '4F7B5BF51329D01AB51430575797C66B'

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // res.header('Content-Type','application/x-www-form-urlencoded','text/html')
    next();
});

var payload = {
    emailSignIn : "anakin",
    passwordSignIn : "abc"
  }

app.post('/',  function(req,res){
    console.log('asdfcsef')
    console.log("TOKEN GENERATED : ", generatorJWT.sign(payload, key, { keyid : '12345' ,noTimestamp : true}))
})

app.get('/test', function(req,res){
    console.log("SOMETHING HAS COME")
})









app.listen(8010, function(){
    console.log("LISTENING IN PORT 8010")
})



