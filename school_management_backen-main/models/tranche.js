const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addTrancheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tranches_insert(?,?,?,?,?)",
      [
        theReq.ecoleId,
			  theReq.prestationId,
			  theReq.libelle,
			  theReq.pourcentage,
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

function trancheSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL tranches_selectBy(?,?,?,?,?,?,?,?,?,?)",

      [
        theReq.id,
        theReq.ecoleId,
			  theReq.prestationId,
			  theReq.libelle,
			  theReq.pourcentage,
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


function deleteTrancheInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tranches_delete(?)",
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
function selectTrancheById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tranches_selectById(?)",
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


function disableTrancheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tranches_disable(?,?,?)",
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

function updateTrancheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tranches_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.ecoleId,
        theReq.prestationId,
			  theReq.libelle,
			  theReq.pourcentage,
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

function selectAllTranche() {
  return new Promise((resolve, reject) => {

    connection.query("CALL tranches_selectAll(?,?,?)",
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
  addTrancheInModel,
  deleteTrancheInModel,
  disableTrancheInModel,
  updateTrancheInModel,
  selectTrancheById,
  selectAllTranche,
  trancheSelectByInModel
}