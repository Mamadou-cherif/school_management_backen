const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addEnseignantClasseInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_insert(?,?,?,?,?)",
      [
        theReq.sessionId,
        theReq.enseignantId,
        theReq.classeId,
        theReq.estPpricipale,
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

function enseignantclasseSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sessionId,
        theReq.enseignantId,
        theReq.classeId,
        theReq.estPpricipale,
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


function deleteEnseignantClasseInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_delete(?)",
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
function selectEnseignantClasseById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_selectById(?)",
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


function disableEnseignantClasseInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_disable(?,?,?)",
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

function updateEnseignantClasseInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sessionId,
        theReq.enseignantId,
        theReq.classeId,
        theReq.estPpricipale,
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

function selectAllEnseignantClasse() {
  return new Promise((resolve, reject) => {

    connection.query("CALL enseignantclasses_selectAll(?,?,?)",
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
  addEnseignantClasseInModel,
  deleteEnseignantClasseInModel,
  disableEnseignantClasseInModel,
  updateEnseignantClasseInModel,
  selectEnseignantClasseById,
  selectAllEnseignantClasse,
  enseignantclasseSelectByInModel
}