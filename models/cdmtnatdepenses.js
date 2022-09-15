const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addCdmtNatDepenseInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL cdmtnatdepenses_insert(?,?,?,?,?)",
      [
            theReq.cdmtProgrammeId,
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

function cdmtnatdepenseSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtnatdepenses_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.cdmtProgrammeId,
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

function getCdmtNatDepenseByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtnatdepenses_selectById(?)",
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


function disableCdmtNatDepenseInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtnatdepenses_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

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


function updateCdmtNatDepenseInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL cdmtnatdepenses_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.cdmtProgrammeId,
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

function getAllCdmtNatDepenseInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL cdmtnatdepenses_selectAll(?,?,?)",
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
  addCdmtNatDepenseInModel,
  disableCdmtNatDepenseInModel,
  updateCdmtNatDepenseInModel,
  getCdmtNatDepenseByIdInModel,
  getAllCdmtNatDepenseInModel,
  cdmtnatdepenseSelectByInModel
}