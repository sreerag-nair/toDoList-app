

var express = require('express');
var router = express.Router();

router.get('/', function(req,res,err){
    if(err) throw err
    res.send("RESPOND WITH A RESOURCE!!")
})

router.get('/profile', function(req,res,err){
    if(err) throw err
    res.send("PROFILE PAGE!!")
})


module.exports = router;