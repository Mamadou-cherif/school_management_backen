const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL activites_insert(?,?,?,?,?,?,?,?,?)",
      [
        theReq.strategieId,
        theReq.numero,
        theReq.libelle,
        theReq.natureId,
        theReq.uniteCompteId,
        theReq.statut,
        theReq.cdmtNatDepenseId,
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

function activiteSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activites_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.strategieId,
        theReq.numero,
        theReq.libelle,
        theReq.natureId,
        theReq.uniteCompteId,
        theReq.statut,
        theReq.cdmtNatDepenseId,
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

function getActiviteByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activites_selectById(?)",
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

function selectNotAffectedPaabIdInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL  activites_selectNotAffectedPaabId(?,?)",
      [
        theReq.papbId,
        theReq.paabId

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

function selectNotAffectedPaabIdInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL  activites_selectNotAffectedPaabId(?,?)",
      [
        theReq.papbId,
        theReq.paabId

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

function selectNotAffectedByPapbIdAndStrategieIdInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activites_selectNotAffectedByPapbIdAndStrategieId(?,?)",
      [
        theReq.strategieId,
        theReq.papbId
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

function disableActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activites_disable(?,?,?)",
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

function activites_getByParams(resultatId) {
  return new Promise((resolve, reject) => {

    connection.query("CALL activites_getByResultatId(?)",
      [
        resultatId
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





function updateActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL activites_update(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.strategieId,
        theReq.numero,
        theReq.libelle,
        theReq.natureId,
        theReq.uniteCompteId,
        theReq.statut,
        theReq.cdmtNatDepenseId,
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

function getAllActiviteInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL activites_selectAll(?,?,?)",
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
  addActiviteInModel,
  selectNotAffectedPaabIdInModel,
  selectNotAffectedByPapbIdAndStrategieIdInModel,
  activites_getByParams,
  disableActiviteInModel,
  updateActiviteInModel,
  getActiviteByIdInModel,
  getAllActiviteInModel,
  activiteSelectByInModel
}