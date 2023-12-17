const Session = require("../models/session")


function selectAllSession(req, res, next) {

    Session.selectAllSession(req)
    .then(session => res.status(200).json(session))
    .catch(error => res.status(400).json(error))
}




module.exports = {
  selectAllSession,
 
}