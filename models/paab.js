const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addPaabInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL paannuelbs_insert(?,?,?,?,?,?)",
      [
        theReq.papbId,
        theReq.libelle,
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

function paabSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL paannuelbs_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.papbId,
        theReq.libelle,
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

function getPaabByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL paannuelbs_selectById(?)",
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


function disablePaabInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL paannuelbs_disable(?,?,?)",
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


function updatePaabInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL paannuelbs_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.papbId,
        theReq.libelle,
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

function getAllPaabInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL paannuelbs_selectAll(?,?,?)",
      [
        1,
        null,
        null,

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

module.exports = {
  addPaabInModel,
  disablePaabInModel,
  updatePaabInModel,
  getPaabByIdInModel,
  getAllPaabInModel,
  paabSelectByInModel
}