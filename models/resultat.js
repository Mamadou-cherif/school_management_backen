const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addResultatInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL resultats_insert(?,?,?,?,?)",
      [
        theReq.sousProgrammeId,
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

    connection.query("CALL resultats_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sousProgrammeId,
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



function getResultatByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL resultats_selectById(?)",
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


function disableResultatInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL resultats_disable(?,?,?)",
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


function updateResultatInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL resultats_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sousProgrammeId,
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

function getAllResultatInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL resultats_selectAll(?,?,?)",
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
  addResultatInModel,
  disableResultatInModel,
  updateResultatInModel,
  getResultatByIdInModel,
  getAllResultatInModel,
  sousProgrammeSelectByInModel
}