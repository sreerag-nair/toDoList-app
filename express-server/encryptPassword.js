
const crypto = require('crypto');
const configurationData = require('./config');

const algorithm = 'aes192' //'aes-256-ctr'
const secretkey = configurationData.secretKey;


//module.exports = 
// function encrypt(password){
//     var cipher = crypto.createCipher(algorithm,secretkey);
//     var crypted = cipher.update(password,'utf8','hex')
//     console.log("crypted : ",crypted )
//     crypted += cipher.final('hex') 
//     console.log("cipher.final : ", crypted)
// }

// encrypt("123")

// module.decrypt = function(encryptedPassword){

// }

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,secretkey)
    cipher.setAutoPadding()
    
    let encrypted = cipher.update("sreerag",'utf8','hex')
    encrypted += cipher.final('hex')
    return encrypted
    // var crypted = cipher.update(text,'utf8','hex')
    // crypted += cipher.final('hex');
    // return crypted;
  }
   
  function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,secretkey)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
   
  var hw = encrypt("123")
  console.log("hw : ", hw)
  console.log(decrypt(hw));