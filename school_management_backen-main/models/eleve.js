const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addEleveInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_insert(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.sessionId,
        theReq.classeId,
        theReq.matricule,
        theReq.nom,
        theReq.prenoms,
        theReq.numeroTuteur1,
        theReq.numeroTuteur2,
        theReq.numeroTuteur4,
        theReq.statut,
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

function eleveSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sessionId,
        theReq.classeId,
        theReq.matricule,
        theReq.nom,
        theReq.prenoms,
        theReq.numeroTuteur1,
        theReq.numeroTuteur2,
        theReq.numeroTuteur4,
        theReq.statut,
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


function deleteEleveInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_delete(?)",
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
function selectEleveById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_selectById(?)",
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

function getEleveByMatriculeAndEcoleId(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_getEleveByMatriculeAndEcoleId(?,?)",
      [
        theReq.ecoleId,
        theReq.matricule,

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



function makeClassement(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_makeClassement(?,?)",
      [
        theReq.ticketId,
        theReq.classeId,

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

function makeSecondaryClassement(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_makeSecondaryClassement(?,?)",
      [
        theReq.ticketId,
        theReq.classeId,

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

function disableEleveInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_disable(?,?,?)",
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

function updateEleveInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_update(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sessionId,
        theReq.classeId,
        theReq.matricule,
        theReq.nom,
        theReq.prenoms,
        theReq.numeroTuteur1,
        theReq.numeroTuteur2,
        theReq.numeroTuteur4,
        theReq.statut,
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

function selectAllEleve() {
  return new Promise((resolve, reject) => {

    connection.query("CALL eleves_selectAll(?,?,?)",
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
  addEleveInModel,
  deleteEleveInModel,
  disableEleveInModel,
  updateEleveInModel,
  makeClassement,
  getEleveByMatriculeAndEcoleId,
  selectEleveById,
  makeSecondaryClassement,
  selectAllEleve,
  eleveSelectByInModel
}