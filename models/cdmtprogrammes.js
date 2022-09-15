const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addCdmtProgrammeInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL cdmtprogrammes_insert(?,?,?,?)",
      [
            theReq.libelle,
            theReq.code,
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

function cdmtprogrammeSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtprogrammes_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
		theReq.code,
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

function getCdmtProgrammeByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtprogrammes_selectById(?)",
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


function disableCdmtProgrammeInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtprogrammes_disable(?,?,?)",
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


function updateCdmtProgrammeInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL cdmtprogrammes_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
		theReq.code,
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

function getAllCdmtProgrammeInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtprogrammes_selectAll(?,?,?)",
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
  addCdmtProgrammeInModel,
  disableCdmtProgrammeInModel,
  updateCdmtProgrammeInModel,
  getCdmtProgrammeByIdInModel,
  getAllCdmtProgrammeInModel,
  cdmtprogrammeSelectByInModel
}