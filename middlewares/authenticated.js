'use strict';

var jwt = require("jsonwebtoken")
var moment = require('moment');
const { createPool } = require("mysql2");
var secret = 'Secret_Key1-2-3.';

exports.ensureAuth = function (req, res, next) {
    console.log(req.headers)
    if (!req.headers.authorization) {
        console.log("a")
        return res.status(403).send({message: 'Forbidden1'});
    } 
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {

        var payload = jwt.decode(token, secret);
       
        
        if (payload.expired <= moment().unix()) {
            console.log("b")
            return res.tatus(401).send({message: 'Expired Token.'});
        }
    } catch (ex) {
        console.log("c")
        return res.status(403).send({message: 'Forbidden: Invalid Token...'});
    }
    req.user = payload;

    next();
};
