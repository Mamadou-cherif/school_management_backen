const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addPayementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_insert(?,?,?,?,?,?,?,?)",
      [
        theReq.eleveId,
        theReq.trancheId,
        theReq.prestationId,
        theReq.typePayements,
        theReq.mois,
        theReq.prix,
        theReq.datePayement,
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

function payementSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.eleveId,
        theReq.typePayements,
        theReq.tranche,
        theReq.mois,
        theReq.prix,
        theReq.datePayement,
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


function deletePayementInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_delete(?)",
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
function selectPayementById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_selectById(?)",
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


function disablePayementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_disable(?,?,?)",
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

function updatePayementInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_update(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.eleveId,
        theReq.typePayements,
        theReq.tranche,
        theReq.mois,
        theReq.prix,
        theReq.datePayement,
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
function getStorySaleByEleve(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_getStorySaleByEleve(?,?)",
      [
        theReq.eleveId,
        theReq.mois,
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

function getElevePasPaye(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_getElevePasPaye(?,?)",
      [
        theReq.classeId,
        theReq.mois,
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

// 
function getStudentSituationByClasseId(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_getStudentSituationByClasseId(?,?)",
      [
        theReq.classeId,
        theReq.mois,
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

function selectAllPayement() {
  return new Promise((resolve, reject) => {

    connection.query("CALL payements_selectAll(?,?,?)",
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
  addPayementInModel,
  getStorySaleByEleve,
  getStudentSituationByClasseId,
  getElevePasPaye,
  deletePayementInModel,
  disablePayementInModel,
  updatePayementInModel,
  selectPayementById,
  selectAllPayement,
  payementSelectByInModel
}