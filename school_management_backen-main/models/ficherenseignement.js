const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addFicheRenInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL fiche_renseignements_insert(?,?,?,?,?)",
      [
        theReq.prestationId,
        theReq.classeId,
        theReq.ecoleId,
        theReq.prix,
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

function ficherenSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL fiche_renseignements_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.prestationId,
        theReq.classeId,
        theReq.ecoleId,
        theReq.prix,
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


function deleteFicheRenInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL fiche_renseignements_delete(?)",
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
function selectFicheRenById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL fiche_renseignements_selectById(?)",
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


function disableFicheRenInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL fiche_renseignements_disable(?,?,?)",
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

function updateFicheRenInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL fiche_renseignements_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.prestationId,
        theReq.classeId,
        theReq.ecoleId,
        theReq.prix,
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

function selectAllFicheRen() {
  return new Promise((resolve, reject) => {

    connection.query("CALL fiche_renseignements_selectAll(?,?,?)",
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
  addFicheRenInModel,
  deleteFicheRenInModel,
  disableFicheRenInModel,
  updateFicheRenInModel,
  selectFicheRenById,
  selectAllFicheRen,
  ficherenSelectByInModel
}