const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL taches_insert(?,?,?,?,?,?)",
      [
        theReq.libelle,
        theReq.code,
        theReq.serviceResponsableId,
        theReq.duree,
        theReq.intervalleRelance,
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

function tacheSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL taches_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.code,
        theReq.serviceResponsableId,
        theReq.duree,
        theReq.intervalleRelance,
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

function getTacheByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL taches_selectById(?)",
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


function disableTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL taches_disable(?,?,?)",
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


function updateTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL taches_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.code,
        theReq.serviceResponsableId,
        theReq.duree,
        theReq.intervalleRelance,
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

function getAllTacheInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL taches_selectAll(?,?,?)",
      [
        1,
        null,
        null,

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

module.exports = {
  addTacheInModel,
  disableTacheInModel,
  updateTacheInModel,
  getTacheByIdInModel,
  getAllTacheInModel,
  tacheSelectByInModel
}