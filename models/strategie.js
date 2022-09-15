const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addStrategieInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_insert(?,?,?,?,?)",
      [
        theReq.resultatId,
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

function strategieSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.resultatId,
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

function getStrategieByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_selectById(?)",
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


function disableStrategieInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_disable(?,?,?)",
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


function updateStrategieInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.resultatId,
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

function strategies_getByParams(sousProgrammeId) {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_getByParams(?)",
      [
        sousProgrammeId
      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else{
        resolve(results[0])
        }
      })
    )
  })
}

function getAllStrategieInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL strategies_selectAll(?,?,?)",
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
  strategies_getByParams,
  addStrategieInModel,
  disableStrategieInModel,
  updateStrategieInModel,
  getStrategieByIdInModel,
  getAllStrategieInModel,
  strategieSelectByInModel
}