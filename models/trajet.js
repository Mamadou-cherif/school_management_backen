const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function selectByIdTrajetInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL trajets_selectById(?)",
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

function getDistanceByContratIdAndChargementId(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL trajets_getDistanceByContratIdAndChargementId(?,?)",
      [
        theReq.contratId,
        theReq.dechargement,
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
function selectAllTrajetInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL trajets_selectAll(?,?,?)",
      [
        1,
        null,
        null
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


function addTrajetInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL trajets_insert(?,?,?,?)",
      [
        theReq.contratId,
        theReq.dechargement,
        theReq.distance,
        theReq.creationUserId,
      ],

      ((err, results, fields) => {
        if (err) {
            console.log(err)
          reject(err)
          //connection.end();
        }
        else {
          resolve(results);
        }

      })
    )
  })
}

function updateTrajetInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL trajets_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.dechargement,
        theReq.distance,
        theReq.modifDate,
        theReq.modifUserId,
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
          //connection.end();
        }
        else {
          resolve(results);
        }

      })
    )
  })
}
function deleteTrajetInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL trajets_delete(?)",
      [
        id,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(results[0]);
        }

      })
    )
  })
}
function trajetSelectByInModel(theReq) {
    
  return new Promise((resolve, reject) => {
    connection.query("CALL trajets_selectBy(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.dechargement,
        theReq.distance,
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




module.exports = {
  getDistanceByContratIdAndChargementId,
  trajetSelectByInModel,
  addTrajetInModel,
  updateTrajetInModel,
  selectByIdTrajetInModel,
  selectAllTrajetInModel,
  deleteTrajetInModel
}
