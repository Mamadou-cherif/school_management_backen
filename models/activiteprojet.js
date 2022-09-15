const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addActiviteProjetInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projetactivites_insert(?,?,?,?,?,?,?,?,?)",
      [
		theReq.projetId,
		theReq.activiteId,
		theReq.reference,
		theReq.debut,
		theReq.fin,
		theReq.copie,
		theReq.renouvelerId,
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

function activiteprojetSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projetactivites_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
		theReq.activiteId,
		theReq.reference,
		theReq.debut,
		theReq.fin,
		theReq.copie,
		theReq.renouvelerId,
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

function getActiviteProjetByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projetactivites_selectById(?)",
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


function disableActiviteProjetInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projetactivites_disable(?,?,?)",
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


function updateActiviteProjetInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL projetactivites_update(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.projetId,
        theReq.activiteId,
        theReq.reference,
        theReq.debut,
        theReq.fin,
        theReq.copie,
        theReq.renouvelerId,
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



function getAllActiviteProjetInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL projetactivites_selectAll(?,?,?)",
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
  addActiviteProjetInModel,
  disableActiviteProjetInModel,
  updateActiviteProjetInModel,
  getActiviteProjetByIdInModel,
  getAllActiviteProjetInModel,
  activiteprojetSelectByInModel
}