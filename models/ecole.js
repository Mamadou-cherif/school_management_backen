const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addEcoleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_insert(?,?,?,?)",
      [
        theReq.libelle,
        theReq.slogan,
        theReq.dateCreation,
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

function ecoleSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_selectBy(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.slogan,
        theReq.dateCreation,
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


function deleteEcoleInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_delete(?)",
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
function selectEcoleById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_selectById(?)",
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


function disableEcoleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_disable(?,?,?)",
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

function updateEcoleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.slogan,
        theReq.dateCreation,
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

function selectAllEcole() {
  return new Promise((resolve, reject) => {

    connection.query("CALL ecoles_selectAll(?,?,?)",
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
  addEcoleInModel,
  deleteEcoleInModel,
  disableEcoleInModel,
  updateEcoleInModel,
  selectEcoleById,
  selectAllEcole,
  ecoleSelectByInModel
}