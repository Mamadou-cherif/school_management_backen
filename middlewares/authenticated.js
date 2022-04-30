'use strict';

var jwt = require("jsonwebtoken")
var moment = require('moment');
const { createPool } = require("mysql2");
var secret = 'Secret_Key1-2-3.';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        console.log("a")
        return res.status(403).send({message: 'Forbidden1'});
    } 
    console.log(req.headers)
    var token = req.headers.authorization.replace(/['"]+/g, '');
    
        var payload = jwt.decode(token, secret);
        
        console.log(payload)
        if (payload.expired <= moment().unix()) {
            console.log("b")
            return res.status(401).send({message: 'veillez vous reconnecter .'});
        }
    

    next();
};
