const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addSousProgrammeInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL sousprogrammes_insert(?,?,?,?,?)",
      [
        theReq.proPrioritaireId,
        theReq.numero,
        theReq.libelle,
        theReq.observations,
        theReq.creationUserId
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else{
        resolve(results[0])
        }
      })
    )
  })
}

function sousProgrammeSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL sousprogrammes_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.proPrioritaireId,
        theReq.numero,
        theReq.libelle,
        theReq.observations,
        theReq.estActif,
        theReq.creationDate,
        theReq.creationUserId,
        theReq.modifDate,
        theReq.modifUserId,
        theReq.debutDonnees,
        theReq.finDonnees
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else{
        resolve(results[0])
        }
      })
    )
  })
}

function getSousProgrammeByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL sousprogrammes_selectById(?)",
      [
        id

      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else{
          resolve(results[0])
        }
        
      })
    )
  })
}


function disableSousProgrammeInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL sousprogrammes_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function updateSousProgrammeInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL sousprogrammes_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.proPrioritaireId,
        theReq.numero,
        theReq.libelle,
        theReq.observations,
        theReq.modifDate,
        theReq.modifUserId
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else{
        resolve(results[0])
        }
      })
    )
  })
}

function getAllSousProgrammeInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL sousprogrammes_selectAll(?,?,?)",
      [
        1,
        null,
        null,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}

module.exports = {
  addSousProgrammeInModel,
  disableSousProgrammeInModel,
  updateSousProgrammeInModel,
  getSousProgrammeByIdInModel,
  getAllSousProgrammeInModel,
  sousProgrammeSelectByInModel
}