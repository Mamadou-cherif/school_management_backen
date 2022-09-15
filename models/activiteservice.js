const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addActiviteServiceInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activiteservices_insert(?,?,?,?,?)",
      [
        theReq.activiteId,
        theReq.serviceId,
        theReq.type,
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

function activiteServiceSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activiteservices_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.serviceId,
        theReq.type,
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

function getActiviteServiceByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activiteservices_selectById(?)",
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


function disableActiviteServiceInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activiteservices_disable(?,?,?)",
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


function updateActiviteServiceInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL activiteservices_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.serviceId,
        theReq.type,
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

function getAllActiviteServiceInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL activiteservices_selectAll(?,?,?)",
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
  addActiviteServiceInModel,
  disableActiviteServiceInModel,
  updateActiviteServiceInModel,
  getActiviteServiceByIdInModel,
  getAllActiviteServiceInModel,
  activiteServiceSelectByInModel
}