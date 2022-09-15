const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addDefisprogrammePrioritaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL defiproprioritaires_insert(?,?,?,?,?)",
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

function defisprogrammePrioritaireSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL defiproprioritaires_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
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

function getDefisprogrammePrioritaireByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL defiproprioritaires_selectById(?)",
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


function disableDefisprogrammePrioritaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL defiproprioritaires_disable(?,?,?)",
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


function updateDefisprogrammePrioritaireInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL defiproprioritaires_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.proprioritaireId,
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

function getAllDefisprogrammePrioritaireInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL defiproprioritaires_selectAll(?,?,?)",
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
  addDefisprogrammePrioritaireInModel,
  disableDefisprogrammePrioritaireInModel,
  updateDefisprogrammePrioritaireInModel,
  getDefisprogrammePrioritaireByIdInModel,
  getAllDefisprogrammePrioritaireInModel,
  defisprogrammePrioritaireSelectByInModel
}