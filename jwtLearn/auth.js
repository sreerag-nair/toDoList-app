const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");


var key = '4F7B5BF51329D01AB51430575797C66B'



router.post('/login', function (req, res, next) {
    console.log("AUTH.js : ", req.body)
    passport.authenticate('local', {session : false}, (err, user, info) =>{
        console.log("usr : ", user)
        console.log("info : ", info)
        if(err || !user){
            return res.status(400).json({
                message : 'Something is note right',
                user : user
            });
        }

        req.login(user, {session : false}, err =>{
            console.log("HERE")
            if(err) res.send(err)
            var token = jwt.sign(user, key);
            console.log("TOKEN GENERATED : ", token)
            return res.json({user, token})
        })

    })
})

module.exports = router;