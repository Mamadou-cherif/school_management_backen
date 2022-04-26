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
        telephone1: user.telephone1,
        telephone2: user.telephone2,
        email: user.email,
        quartierdistrictId: user.quartierdistrictId,
        observations: user.observations,
        iat: moment().unix(),
        expired: moment().add(15, 'min').unix()
    };
    return jwt.sign(payload, secret);
};