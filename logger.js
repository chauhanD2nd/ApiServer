//remote loggin service
let url = 'http://mylogger.io/log';
let log = function(message){
    console.log(message);
}

module.exports.log = log;