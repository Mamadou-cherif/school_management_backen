const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addMatiereInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_insert(?,?,?,?)",
      [
        theReq.classeId,
        theReq.libelle,
        theReq.coefficient,
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

function matiereSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_selectBy(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.classeId,
        theReq.libelle,
        theReq.coefficient,
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


function deleteMatiereInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_delete(?)",
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
function selectMatiereById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_selectById(?)",
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



function disableMatiereInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_disable(?,?,?)",
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

function updateMatiereInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.classeId,
        theReq.libelle,
        theReq.coefficient,
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

function selectAllMatiere() {
  return new Promise((resolve, reject) => {

    connection.query("CALL matieres_selectAll(?,?,?)",
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
  addMatiereInModel,
  deleteMatiereInModel,
  disableMatiereInModel,
  updateMatiereInModel,
  selectMatiereById,
  selectAllMatiere,
  matiereSelectByInModel
}