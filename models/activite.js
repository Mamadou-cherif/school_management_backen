const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL activites_insert(?,?,?,?,?,?)",
      [
		    theReq.strategieId,
	    	theReq.cdmtNatDepenseId,
        theReq.numero,
	    	theReq.libelle,
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

    connection.query("CALL activites_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.strategieId,
	    	theReq.cdmtNatDepenseId,
        theReq.numero,
	    	theReq.libelle,
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


function updateActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL activites_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.strategieId,
	    	theReq.cdmtNatDepenseId,
        theReq.numero,
	    	theReq.libelle,
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
  disableActiviteInModel,
  updateActiviteInModel,
  getActiviteByIdInModel,
  getAllActiviteInModel,
  activiteSelectByInModel
}