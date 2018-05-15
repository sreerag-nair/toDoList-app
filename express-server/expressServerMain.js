var express = require('express');
// var mongo = require('mongodb').MongoClient
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var bodyParser = require('body-parser');
var configurationData = require('./config');
var passport = require('passport')
var passportJWT = require('passport-jwt')
var { create, read } = require('./dbCommunication');



//THIS IS THE DEFAULT WAY OF PARSING POST REQUEST 
// app.use(bodyParser.urlencoded({extended : false}))


//----------------THE MIDDLEWARE FUNCTIONS-----------//
//         CUSTOM MIDDLEWARE FUNCTION         //

function tokenChecker(req, res, next) {

    switch (req.route.path) {
        case '/':
            console.log("default path");
            break;

        case '/signup':
            // console.log("signup");
            // console.log("ACQUIRED : " + req.body.userNameSignIn)
            // next();
            break;

        case '/logout':
            //call a function that deletes the token from
            //the database
            // the localstorage item will be deleted by the app after getting a specific request
            //from here 
            console.log("Logout in TokenCheckerFunction");
            break;

        default:
            console.log("DEFAULT STATE");
            break;
    }

    //you get a JSON object so u need to parse it back into object -_- LINE GIVING ERROR
    // console.log("TokenCheckingMiddleware : ", JSON.parse(req.headers.jwttokenheader).token);
    next();     //THIS IS IMPORTANT
}

//         THE MIDDLEWARE FUNCTION ENDS   //



//very important as u are receiving a JSON object
app.use(bodyParser.json())


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    // add jwtToken in the end to allow it in the header
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwtTokenHeader");
    next();
});

//---------------THE MIDDLEWARE FUNCTIONS-------------//


var users = {
    name: 'Sreerag',
    password: 'qwerty'
}

var userObjArray = [
    {
        username : 'anakin',
        name : 'Anakin Skywalker',
        emailId : 'abc@test.com',
        password : 'abc'
    },
    {
        
        username : 'leia',
        name : 'Leia Organa',
        emailId : 'jkl@test.com',
        password : 'edf'
    },
    {
        username : 'mace',
        name : 'Mace Windu', 
        emailId : 'ghi@test.com',
        password : 'ghi'
    },
    {
        username : 'yoda',
        name : 'Master Yoda',
        emailId : 'jkl@test.com',
        password : 'jkl'
    },
    {
        
        username : 'palpatine',
        name : 'Emperor Palpatine',
        emailId : 'hij@test.com',
        password : 'hij'
    }
]


//SIGNIN ROUTE
app.post('/', tokenChecker, function (req, res) {

    // res.json({ hello : 'There' })
    var name, pwd;

    if (req.body.userNameSignIn && req.body.passwordSignIn) {
        name = req.body.userNameSignIn
        pwd = req.body.passwordSignIn
    }


    if (name != users.name)      //TALK TO THE DATABASE
        res.status(401).json({ error: "USERNAME NOT FOUND! " })

    if (pwd === users.password) {
        var payload = { id: users.id };

        //THE SIGNING FUNCTIONATLITY IE. THE TOKEN GENERATION
        var token = jwt.sign(payload, configurationData.secretKey)
        // console.log("TOKEN GENERATED : " , token);
        res.json({ message: "OK", token: token })
        // res.end();
    }

})


app.post('/logout', tokenChecker , function (req, res) {
    console.log("GOT LOGOUT");
    res.end();
})


// FOR SIGNING UP
app.post('/signup', tokenChecker ,function (req, res) {
    console.log("SIGN UP");

    // console.log(req.body)

    // for(var i = 0; i < userObjArray.length; i++){
    //     // console.log(userObjArray[i])
    //     create(userObjArray[i]);
    // }

    // read("Sreerag")
    create({_id : '5af9d26a6f7c4f5060e57573', key : 'THISISASECRETKEY'})

    
    console.log('INSERTED - from middleware')
})




app.listen(8001, function () {
    console.log("SERVER RUNNING AT 8001");
});