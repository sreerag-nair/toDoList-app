var express = require('express');
// var mongo = require('mongodb').MongoClient
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var bodyParser = require('body-parser');
var configurationData = require('./config');
var passport = require('passport')
var passportJWT = require('passport-jwt')
var { create, newUser, read, searchUserCreds } = require('./dbCommunication');



//THIS IS THE DEFAULT WAY OF PARSING POST REQUEST 
// app.use(bodyParser.urlencoded({extended : false}))


//----------------THE MIDDLEWARE FUNCTIONS-----------//


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
app.post('/', function (req, res) {


    // var name, pwd;

    // if (req.body.userNameSignIn && req.body.passwordSignIn) {
    //     name = req.body.userNameSignIn
    //     pwd = req.body.passwordSignIn
    // }


    // if (name != users.name)      //TALK TO THE DATABASE
    //     res.status(401).json({ error: "USERNAME NOT FOUND! " })

    // if (pwd === users.password) {
    //     var payload = { id: users.id };

    //     //THE SIGNING FUNCTIONATLITY IE. THE TOKEN GENERATION
    //     var token = jwt.sign(payload, configurationData.secretKey)
    //     // console.log("TOKEN GENERATED : " , token);
    //     res.json({ message: "OK", token: token })
    //     // res.end();
    // }

    var form_username, form_pwd;
    // userNameSignIn here is the email id
    if (req.body.emailSignIn && req.body.passwordSignIn) {
        form_username = req.body.emailSignIn
        form_pwd = req.body.passwordSignIn
    }

    //talk to the database and get the promise
    searchUserCreds(form_username, form_pwd).then(x => console.log("z : ", x))
    console.log("req.headers : " , req.headers.authorization)

})

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
    res.write("GOT THE HANDLE!");
    res.end();
})


app.post('/logout', function (req, res) {
    console.log("GOT LOGOUT");
    res.end();
})


// FOR SIGNING UP  - creating user accounts
app.post('/signup', function (req, res) {
    console.log("SIGN UP");

    var userCredObject = {}
    userCredObject.userName = req.body.userNameSignUp
    userCredObject.password = req.body.passwordSignUp
    userCredObject.emailId = req.body.emailSignUp


    console.log("OBJEC GENERATED : " , userCredObject);

    newUser(userCredObject).then(x => console.log("INSERT SUCCESSFUL"))

    // for (var i = 0; i < userObjArray.length; i++) {
        // console.log(userObjArray[i])
        // create(res, userObjArray[i]);
    // }

})



app.listen(8001, function () {
    console.log("SERVER RUNNING AT 8001");
});



// -----------LINKS------------

// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/