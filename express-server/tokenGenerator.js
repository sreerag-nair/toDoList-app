
var jwt = require('jsonwebtoken')

const configurationData = require('./config');


const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = configurationData.secretKey;
opts.algorithms = 'HS256 ';

exports.generateToken = function (emailId, password) {

    var dataObj = {}
    dataObj.emailId = emailId
    dataObj.password = password

    var token = jwt.sign(dataObj, opts.secretOrKey, { expiresIn: '2h' })

    console.log("TOKEN : ", token)
}