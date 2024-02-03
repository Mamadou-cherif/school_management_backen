'use strict';

var jwt = require("jsonwebtoken")
var moment = require('moment');
const { createPool } = require("mysql2");
var secret = 'Secret_Key1-2-3.';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {

        return res.status(403).send({ message: 'Forbidden1' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    var payload = jwt.decode(token, secret);


    if (payload.expired <= moment().unix()) {

        return res.status(401).send({ message: 'veillez vous reconnecter .' });
    }


    next();
};
