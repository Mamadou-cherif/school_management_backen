'use strict';

var jwt = require("jsonwebtoken");
var moment = require('moment');
var secret = 'mot-de-passe';

exports.createtoken = function (user) {
    var payload = {
        id:user.id,
        structureId: user.structureId,
        prestataireId: user.prestataireId,
        nom: user.nom,
        prenoms: user.prenoms,
        fonction: user.fonction,
        telephone: user.telephone,
        telephone2: user.telephone2,
        email: user.email,
        quartierdistrictId: user.quartierdistrictId,
        iat: moment().unix(),
        expired: moment().add(24, 'h').unix()
    };
    return jwt.sign(payload, secret);
};