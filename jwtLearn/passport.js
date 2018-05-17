

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
        emailId: 'edf@test.com',
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

var tokenCollection = [
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiYWJjQHRlc3QuY29tIiwianRpIjoiMmUyMzdjOTctOTZlMS00ZjY0LThhZTctMjI0ODY1ZWFiMGFiIiwiaWF0IjoxNTI2NTM5MjEwLCJleHAiOjE1MjY1NDI4MTB9.t_o3ohe3_gHWW_5_Q8YipAhRUUcI1dQ6STOar3MW_kc',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiamtsQHRlc3QuY29tIiwianRpIjoiNWFjZDI2OTAtMTI1NC00MGIzLWJiYTEtMjZjYWI2ZDNhZWVlIiwiaWF0IjoxNTI2NTM5MjQ3LCJleHAiOjE1MjY1NDI4NDd9.TIWyD8ZFS4yzQdajrmAmSb0_Ji7uMYuj99Pee261DUQ',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiZ2hpQHRlc3QuY29tIiwianRpIjoiYmIxNjg5MTEtYmRlNi00NzkyLTk1NzAtMzdhN2I3YzA2YWFmIiwiaWF0IjoxNTI2NTM5MjcwLCJleHAiOjE1MjY1NDI4NzB9.Z7VjyxWmhP_Mf0VGOpOIjos44YjjBrfber035VHadqg',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiZWRmQHRlc3QuY29tIiwianRpIjoiZTU4NGY2YTEtMmE5YS00MWUxLTliZDctZDcxNzYwYzYzMDI3IiwiaWF0IjoxNTI2NTM5MjkxLCJleHAiOjE1MjY1NDI4OTF9.qG3CDTtXMwgZOfW95t3IDHcFaVVXLCWaLsjfxrYrJIY',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbElkIjoiaGlqQHRlc3QuY29tIiwianRpIjoiMDRjMDdmZTQtYzBkMS00OWQ1LWI4YTUtN2Y1ODc1Y2RkOGM1IiwiaWF0IjoxNTI2NTM5MzA4LCJleHAiOjE1MjY1NDI5MDh9.eU3TS5Oa2S2GISCdC8geI_KlMj5r1maR4zZKm5Ll0z8'
]


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, 
    function (email, password, cb) {
    console.log("Here")

    if (userObjArray.map(( x, idx) => { return x.emailId }).includes(email)) {
        return cb(null, userObjArray[idx] , {
            message : 'Logged In successfully.....'
        });
    }
    else{
        return cb(null, false , {
            message : 'Incorrect user credentials....'
        });
    }
}))

passport.use(new JWTStrategy({

    //KEEP THIS STATIC FOR NOW!!
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : '4F7B5BF51329D01AB51430575797C66B'

}, function(jwtPayload, cb){
    //check if the token is valid by retrieving and comparing the 
    // stored token id in the db
    console.log("jwtPayload : " , jwtPayload)

    if(tokenCollection.includes(jwtPayload.id)){
        //pass!
        return cb(null, {message : 'Present...'})
    }
    else{
        //fail!
        return cb({message : 'Not present!'})
    }
    
    
}))