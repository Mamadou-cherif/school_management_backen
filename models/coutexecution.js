const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addCoutExecutionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_insert(?,?,?,?,?,?)",
      [
        theReq.qtePrevisonnelleId,
		theReq.montantRealise,
		theReq.deviseId,
		theReq.bailleurId,
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

function coutExecutionSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.qtePrevisonnelleId,
        theReq.montantRealise,
        theReq.deviseId,
        theReq.bailleurId,
        theReq.observations,
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


function deleteCoutExecutionInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_delete(?)",
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
function getCoutExecutionByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_selectById(?)",
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


function disableCoutExecutionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_disable(?,?,?)",
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

function updateCoutExecutionInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.qtePrevisonnelleId,
		theReq.montantRealise,
		theReq.deviseId,
		theReq.bailleurId,
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

function getAllCoutExecutionInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL coutexecutions_selectAll(?,?,?)",
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
  addCoutExecutionInModel,
  deleteCoutExecutionInModel,
  disableCoutExecutionInModel,
  updateCoutExecutionInModel,
  getCoutExecutionByIdInModel,
  getAllCoutExecutionInModel,
  coutExecutionSelectByInModel
}