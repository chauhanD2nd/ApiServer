
let log = function(req, res, next){
    console.log('author logger...');
    next();
};

module.exports = log;