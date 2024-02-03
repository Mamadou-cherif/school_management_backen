var jwt = require("jsonwebtoken")
var moment = require('moment');
const { createPool } = require("mysql2");
var secret = 'Secret_Key1-2-3.';

function checktokenexpire(req, res, next){
    if (!req.params.token) {
        return res.status(403).send({message: 'aucun token trouvé'});
    }
    var token = req.params.token.replace(/['"]+/g, '');
        var payload = jwt.decode(token, secret);

        if (payload.expired <= moment().unix()) {
            return res.status(200).send({expired: true});
        }
        else{
            return res.status(200).send({expired:false});

        }
}

module.exports= {checktokenexpire}