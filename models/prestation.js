const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addPrestationInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestations_insert(?,?,?,?,?)",
      [
        theReq.libelle,
        theReq.modePaiement,
        theReq.duree,
        theReq.uniteDuree,
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

function prestationSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestations_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.modePaiement,
        theReq.duree,
        theReq.uniteDuree,
        theReq.estActif,
        theReq.creationDate,
        theReq.creationUserId,
        theReq.modifDate,
        theReq.modifUserId,
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


function deletePrestationInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestations_delete(?)",
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
function selectPrestationById(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prestations_selectById(?)",
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


function disablePrestationInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestations_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

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

function updatePrestationInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL prestations_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.modePaiement,
        theReq.duree,
        theReq.uniteDuree,
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

function selectAllPrestation() {
  return new Promise((resolve, reject) => {

    connection.query("CALL prestations_selectAll(?,?,?)",
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
  addPrestationInModel,
  deletePrestationInModel,
  disablePrestationInModel,
  updatePrestationInModel,
  selectPrestationById,
  selectAllPrestation,
  prestationSelectByInModel
}