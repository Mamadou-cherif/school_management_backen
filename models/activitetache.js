const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addActiviteTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitetaches_insert(?,?,?,?,?,?,?,?)",
      [
        theReq.activiteId,
        theReq.tacheId,
        theReq.responsableId,
        theReq.niveauExecution,
        theReq.tauxExecution,
        theReq.problemesRencontrees,
        theReq.solutions,
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

function activitetacheSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitetaches_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.tacheId,
        theReq.responsableId,
        theReq.niveauExecution,
        theReq.tauxExecution,
        theReq.problemesRencontrees,
        theReq.solutions,
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

function getActiviteTacheByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitetaches_selectById(?)",
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


function disableActiviteTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitetaches_disable(?,?,?)",
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


function updateActiviteTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitetaches_update(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.tacheId,
        theReq.responsableId,
        theReq.niveauExecution,
        theReq.tauxExecution,
        theReq.problemesRencontrees,
        theReq.solutions,
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

function getAllActiviteTacheInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitetaches_selectAll(?,?,?)",
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
  addActiviteTacheInModel,
  disableActiviteTacheInModel,
  updateActiviteTacheInModel,
  getActiviteTacheByIdInModel,
  getAllActiviteTacheInModel,
  activitetacheSelectByInModel
}