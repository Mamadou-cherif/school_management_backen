const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function activite_getParams(theReq) {
    return new Promise((resolve, reject) => {

        connection.query("CALL activites_getByParams(?,?)",
          [
                    theReq.papbId,
                    theReq.paabId,
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

function addActivitePaabInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitepaabs_insert(?,?,?,?,?,?,?,?)",
      [
        theReq.paabId,
        theReq.activiteId,
        theReq.quantite,
        theReq.coutUnitaire,
        theReq.debut,
        theReq.fin,
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

function activitePaabSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitepaabs_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.paabId,
        theReq.activiteId,
        theReq.quantite,
        theReq.coutUnitaire,
        theReq.debut,
        theReq.fin,
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

function getActivitePaabByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitepaabs_selectById(?)",
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


function disableActivitePaabInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitepaabs_disable(?,?,?)",
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


function updateActivitePaabInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL activitepaabs_update(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.paabId,
        theReq.activiteId,
        theReq.quantite,
        theReq.coutUnitaire,
        theReq.debut,
        theReq.fin,
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

function getAllActivitePaabInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL activitepaabs_selectAll(?,?,?)",
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
  addActivitePaabInModel,
  disableActivitePaabInModel,
  updateActivitePaabInModel,
  getActivitePaabByIdInModel,
  getAllActivitePaabInModel,
  activitePaabSelectByInModel,
  activite_getParams
}