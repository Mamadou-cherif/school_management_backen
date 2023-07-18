const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function selectByIdFlotteInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL flottes_selectById(?)",
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

function selectAllFlotteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL flottes_selectAll(?,?,?)",
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

function addFlotteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL flottes_insert(?,?,?,?,?)",
      [
        theReq.libelle,
        theReq.Responsable,
        theReq.telephone,
        theReq.email,
        theReq.creationUserId,
      ],

      ((err, results, fields) => {
        if (err) {

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

function updateFlotteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL flottes_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.Responsable,
        theReq.telephone,
        theReq.email,
        theReq.modifDate,
        theReq.modifUserId,
      ],

      ((err, results, fields) => {
        if (err) {
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
function deleteFlotteInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL flottes_delete(?)",
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
function flotteSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL flottes_selectBy(? ,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.Responsable,
        theReq.telephone,
        theReq.email,
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
  flotteSelectByInModel,
  addFlotteInModel,
  updateFlotteInModel,
  selectByIdFlotteInModel,
  selectAllFlotteInModel,
  deleteFlotteInModel
}
