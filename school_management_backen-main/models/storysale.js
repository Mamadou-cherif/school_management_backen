const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addstorySaleInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL storysales_insert(?,?,?,?,?,?,?,?)",
      [
        theReq.eleveId,
        theReq.trancheId,
        theReq.prestationId,
        theReq.typePayements,
        theReq.mois,
        theReq.prix,
        theReq.datePayement,
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

function storysaleSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL storysales_selectBy(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.eleveId,
        theReq.typePayements,
        theReq.tranche,
        theReq.mois,
        theReq.prix,
        theReq.datePayement,
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


function deletestorySaleInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL storysales_delete(?)",
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
function selectstorySaleById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL storysales_selectById(?)",
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


function disablestorySaleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL storysales_disable(?,?,?)",
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

function updatestorySaleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL storysales_update(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.eleveId,
        theReq.typePayements,
        theReq.tranche,
        theReq.mois,
        theReq.prix,
        theReq.datePayement,
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

function selectAllstorySale() {
  return new Promise((resolve, reject) => {

    connection.query("CALL storysales_selectAll(?,?,?)",
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
  addstorySaleInModel,
  deletestorySaleInModel,
  disablestorySaleInModel,
  updatestorySaleInModel,
  selectstorySaleById,
  selectAllstorySale,
  storysaleSelectByInModel
}