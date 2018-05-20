// var express = require('express');
// var mongo = require('mongodb').MongoClient
const mongoose = require('mongoose');
// for signing a jwt token
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = require('express')();
const bodyParser = require('body-parser');
const configurationData = require('./config');
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors')
// to import the database functions
const { create, newUser, read, searchUserCreds } = require('./dbCommunication');



//THIS IS THE DEFAULT WAY OF PARSING POST REQUEST 
// app.use(bodyParser.urlencoded({extended : false}))


//----------------THE MIDDLEWARE FUNCTIONS BLOCK-----------//

//very important as u are receiving a JSON object
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    // res.header('Content-Type','application/x-www-form-urlencoded','text/html')
    next();
});

//---------------THE MIDDLEWARE FUNCTIONS BLOCK-------------//


var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = configurationData.secretKey;
opts.algorithms = 'HS256 ';

// the passport strategy for handling jwt auth requests
passport.use(new jwtStrategy(opts, function(jwttoken, done){

    console.log("TOKEN : ", jwttoken)
    // done(null,"sedfs")

}))

var users = {
    name: 'Sreerag',
    password: 'qwerty'
}

var userObjArray = [
    {
        userName: 'anakin',
        name: 'Anakin Skywalker',
        emailId: 'abc@test.com',
        password: 'abc'
    },
    {

        userName: 'leia',
        name: 'Leia Organa',
        emailId: 'jkl@test.com',
        password: 'edf'
    },
    {
        userName: 'mace',
        name: 'Mace Windu',
        emailId: 'ghi@test.com',
        password: 'ghi'
    },
    {
        userName: 'yoda',
        name: 'Master Yoda',
        emailId: 'jkl@test.com',
        password: 'jkl'
    },
    {

        userName: 'palpatine',
        name: 'Emperor Palpatine',
        emailId: 'hij@test.com',
        password: 'hij'
    }
]

var notesObjArray = [
    {
        title: 'Shopping List',
        list: [
            {
                content: 'Eggs',
                isChecked: true
            },
            {
                content: 'Milk',
                isChecked: true
            },
            {
                content: 'Cereals',
                isChecked: false
            },
            {
                content: 'Bread',
                isChecked: true
            },
        ]
    },
    {
        title: 'Word List',
        list: [
            {
                content: 'Cornucopia',
                isChecked: false
            },
            {
                content: 'Abtruse',
                isChecked: false

            },
            {
                content: 'Orwellian',
                isChecked: true
            },
            {
                content: 'Obtruse',
                isChecked: false
            },
        ]
    },
    {
        title: 'Villain List',
        list: [
            {
                content: 'Joker',
                isChecked: false
            },
            {
                content: 'Copperhead',
                isChecked: true
            },
            {
                content: 'Prometheus',
                isChecked: false
            },
            {
                content: 'Harley Quinn',
                isChecked: true
            }
        ]
    }
]

//SIGNIN ROUTE
app.post('/', function(req, res, next) {

    //check if the header has an auth bearer
    if(req.headers.authorization){
        console.log("PROCEEDING TO CREATE A NEW USER...");
        console.log(req.body)
    }
    // next();
  } ,
  passport.authenticate('jwt', { session: false
    // , successRedirect : 'http://www.google.com', 
    // failureRedirect : '/' 
}));





// adding new note - create operation
app.post('/addnewnote', function(req, res){

})

//get all the notes of a specific user - read/retrieve operation
app.get('', function(req, res){

})

// update an existing card - update operation
app.put('/update/:id', function(req,res){

})

//for deletion operation
app.post('/deletenote/:id', function (req, res) {
    res.write("GOT THE HANDLE!");
    res.end();
})


app.post('/logout', function (req, res) {
    console.log("GOT LOGOUT");
    res.end();
})


// FOR SIGNING UP  - creating user accounts
app.post('/signup', function (req, res) {

    // create a user object to push to the db
    var userCredObject = {}
    userCredObject.userName = req.body.userNameSignUp
    userCredObject.password = crypto.createHash('sha256').update(req.body.passwordSignUp).digest('hex');
    userCredObject.emailId = req.body.emailSignUp

    // newUser(userCredObject).then(x => console.log("INSERT SUCCESSFUL").catch(a => console.log("ERROR")))

    //sync function
    newUser(userCredObject).save(function(err,d){
        //send this error in a fancy way back to the app
        if(err) throw err

        

    })
    res.end();
})



app.listen(8001, function () {
    console.log("SERVER RUNNING AT 8001 - expressServerMain.js");
});



// -----------LINKS------------

// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/