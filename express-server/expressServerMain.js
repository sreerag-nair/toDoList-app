
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

// import the database functions
const { getAllNoteContent, getNotesTitle, insertNoteTitle, insertNoteEntry, newUser /*, read*/,
    removeNotesTitle, removeSingleEntry, searchUserCreds, searchUserEmail, updateEntry, updateTitle, updateUserInfo } = require('./dbCommunication');

    const { generateToken } = require('./tokenGenerator');
const multer = require('multer');
const del = require('del');
const path = require('path');

//THIS IS THE DEFAULT WAY OF PARSING POST REQUEST 
// app.use(bodyParser.urlencoded({extended : false}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${file.originalname}`;
      cb(null, newFilename);
    },
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });

//----------------THE MIDDLEWARE FUNCTION BLOCK-----------//

//very important as u are receiving a JSON object
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(passport.initialize())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
});

//---------------THE MIDDLEWARE FUNCTION BLOCK-------------//

// --------------PASSPORT CUSTOM JWT STRATEGY------------//
var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = configurationData.secretKey;
opts.algorithms = 'HS256 ';

// the passport strategy for handling jwt auth requests
passport.use(new jwtStrategy(opts, function (jwttoken, done) {

    // console.log("TOKEN : ", jwttoken)

    //make some db calls
    searchUserCreds(jwttoken.emailId, jwttoken.password)
        .then(function (doc, err) {
            if (doc) {
                // valid case
                done(null, doc)
            }
            else {
                //invalid case
                done(err)
            }
        })

}))
// --------------PASSPORT CUSTOM JWT STRATEGY---------------//



//SIGNIN ROUTE
app.post('/', function (req, res, next) {

    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {


        // console.log("err : ", err);
        // console.log("user : ", user);
        // console.log("info : ", info);

        if (user) {   // it means the pre-existing token is valid
            res.status(200).send();
        }

        if (info && (Object.keys(req.body) != 0)) {    //it means there is no token in the app and something is in the body;
            var hashedPassword = crypto.createHash('sha256').update(req.body.passwordSignIn).digest('hex');
            console.log("HASHEDPASSWORD : ", hashedPassword)
            // used promise
            searchUserCreds(req.body.emailSignIn, hashedPassword)
                .then(function (doc, err) {
                    console.log("doc : ", doc)
                    if (doc) { //got something , so generate token and send it to the user
                        var token = generateToken(req.body.emailSignIn, hashedPassword)
                        res.status(200).json({ token: token })
                    } else {
                        // there is no such user in the db, send error
                        res.status(404).json({ userError: "Invalid email id or password" })
                    }
                })
        }
    })(req, res, next);
});


// FOR SIGNING UP  - creating user accounts
app.post('/signup', function (req, res, next) {

    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {
        // console.log("err : ", err);
        // console.log("user : ", user);
        // console.log("info : ", info);

        if (user) {    // a jwt token already exists
            res.status(200).end();
        }
        else {

            // create a user object to push to the db
            var userCredObject = {}
            userCredObject.userName = req.body.userNameSignUp
            userCredObject.emailId = req.body.emailSignUp

            searchUserEmail(userCredObject.emailId)
                .then(function (doc, err) {
                    // it means that there is no user with the matching emailId in the db
                    if (!doc) {
                        userCredObject.password = crypto.createHash('sha256').update(req.body.passwordSignUp).digest('hex');
                        newUser(userCredObject).then(function (doc, err) {
                            if (err) throw err

                            console.log('created doc : ', doc)
                            // :-> redirect the user
                            var token = generateToken(doc.emailId, doc.password)
                            res.status(201).json({ token: token });

                        })
                    }
                    // the emailId exists in the db... throw error or notice
                    else {

                        //-----NOTHING TO DO HERE.... THIS PROBLEM HAS BEEN SOLVED ELSEWHERE-----

                        //send this error in a fancy way back to the app
                        // res.status(400).send();
                    }
                })


        }


    })(req, res, next);

})

app.post('/checkEmailRedundancy', function (req, res) {
    // console.log("hgsfgsnuyfjvguynbgj : ", req.body.emailToCheck)
    searchUserEmail(req.body.emailToCheck)
        .then((doc, err) => {
            if (doc)
                res.status(409).send();
            else
                res.status(200).send();
        }
        )
})

app.post('/profileinfo', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {
        // console.log("err : ", err);
        console.log("user : ", user);
        // console.log("info : ", info);
        console.log("incoming reqzzz : ", req.body["password"])
        // this.user = user


        if (user) {

            if (Object.keys(req.body) != 0) {

                req.body["password"] = (req.body["password"] == '') ? user.password :
                    crypto.createHash('sha256').update(req.body.password).digest('hex')

                console.log("incoming req : ", req.body)

                updateUserInfo(req.body)
                    .then((doc, err) => {

                        //updation successful...
                        if (doc) {
                            console.log("DOOOC : ", doc)
                            res.status(200).send()
                        }
                    })
                    .catch((err) => {
                        res.status(400).send()
                    })

            }
            else {
                console.log("IN ELSE...........")
                res.status(200).send({ userName: user.userName, emailId: user.emailId, password: user.password, name: user.name })
            }


        }
        else {
            // 401 - unauthorized request
            res.status(401).send();
        }

    })(req, res, next);
})

// adding new note - create operation
app.post('/addnewnote', function (req, res, next) {


    passport.authenticate('jwt',
        function (err, user, info) {

            // console.log("ADDNEWNOTE : ", req.body.title)

            if (user) {

                searchUserCreds(user.emailId, user.password)
                    .then(function (doc, err) {
                        if (err) throw err

                        insertNoteTitle(doc._id, req.body.title)
                            .then(function (doc, err) {   //returns the inserted document

                                //loop over the entries array and insert each one by one
                                req.body.entries.map(
                                    (entryObj, idx) => {
                                        insertNoteEntry(doc._id, entryObj.content, entryObj.isChecked)
                                        // console.log("expressServer - ln 210")
                                    }
                                )
                                res.status(200).send()
                                setTimeout(() => {
                                }, 1000)
                            })
                    })

            }
            else {
                res.status(401).send();
            }

        })(req, res, next);
})
// only for authorization when mounting AddNoteComponent 
app.post('/shouldRedirect', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {

        console.log("IN HEREE - /shouldRedirect")

        if (!user) //UNAUTHORIZED...
            res.status(401).send()
    })
})



//get all the notes of a specific user - read/retrieve operation
app.get('/getnotes', function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    },
        function (err, user, info) {

            console.log("in getnotes route....")
            if (user) {
                var objToSend = []

                //make db calls and create an object....

                getNotesTitle(user._id)
                    .then((notesTitleArray, err1) => {
                        // console.log("singleNoteEntry : ", notesTitleArray)
                        notesTitleArray.map((noteTitle, titleIndex) => {
                            //create a new entry with the title and _id

                            objToSend.push({
                                _id: noteTitle._id, title: noteTitle.title,
                                createdDate: new Date(noteTitle.createdAt).toLocaleString("en-US"), updatedDate: new Date(noteTitle.updatedAt).toLocaleString("en-US")
                            })

                        })

                        // console.log("AFTER : ", objToSend)

                        res.status(200).send(objToSend);

                    })


                // res.status(200).send(objToSend);


            }
            else {
                console.log("Unauthorized user in getnotes...")
                res.status(401).send();
            }

        })(req, res, next);
})

app.get('/getcurrentnote/:noteID', function (req, res, next) {
    // console.log("req body : ", req.params.noteID)

    //TRY ASYNC-AWAIT HERE

    var valueToSend = []

    getAllNoteContent(req.params.noteID)
        .then((noteEntryArray) => {
            noteEntryArray.map((eachEntry) => {
                valueToSend.push({ content: eachEntry.content, _id: eachEntry._id, isChecked: eachEntry.isChecked })
            })

            res.status(200).send(valueToSend)
        })

})

// update an existing card - update operation
app.put('/update/:id', function (req, res, next) {

    // console.log("ID : ", req.params.id)
    // console.log("Code : ", req.body)



    updateTitle(req.params.id, req.body.noteTitle)
        .then((doc, err) => {
            if (doc) {
                // console.log("NOTE TITLE UPDATED : ", doc)
                req.body.toUpdateOrEnter.map(obj => {

                    //update
                    if (obj._id != null) {
                        updateEntry(obj._id, obj.content, obj.isChecked)
                            .then((doc, err) => {
                                // console.log("Updated")
                            })

                    } else {
                        //insert
                        insertNoteEntry(req.params.id, obj.content, obj.isChecked)
                            .then((doc, entry) => {
                                // console.log("New Entry")
                            })
                    }
                })



                //delete entries... 
                //try async/await for multiple promises
                req.body.toDelete.map(obj => {
                    removeSingleEntry(obj._id)
                        .then((doc, err) => {
                            console.log("Deleted....")
                        })
                })



                res.status(200).send();
            }
            else {
                res.status(401).send()
            }
        })



})


//for deletion operation
app.delete('/deletenote/:id', function (req, res, next) {

    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {
        // console.log("user : ", user)
        // console.log("err : ", err)
        // console.log("info : ", info)

        if (user) {

            // soft delete
            removeNotesTitle(req.params.id)
                .then((doc, err) => {
                    if (err) {
                        res.status(400).send();
                        throw err
                    }

                    if (doc)
                        res.status(200).send();

                })

        }
        else {
            //unauthorized user
            res.status(401).send()
        }


    })(req, res, next);


})


app.post('/logout', function (req, res) {
    console.log("GOT LOGOUT");
    res.status(200).send();
})




app.post('/sendFile',upload.array('bird'), function (req, res, next) {

    
    // console.log("dfgb : ", req.file.filename)
    res.send()
    


})



app.listen(8001, function () {
    console.log("SERVER RUNNING AT 8001 - expressServerMain.js");
});



// -----------LINKS------------

// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

