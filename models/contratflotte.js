const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function selectByIdContratFlotteInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contratflottes_selectById(?)",
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

function selectAllContratFlotteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contratflottes_selectAll(?,?,?)",
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


function addContratFlotteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contratflottes_insert(?,?,?,?)",
      [
        theReq.contratId,
        theReq.flotteId,
        theReq.observations,
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

function updateContratFlotteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contratflottes_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.flotteId,
        theReq.observations,
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
          resolve(results[0]);
        }

      })
    )
  })
}
function deleteContratFlotteInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL contratflottes_delete(?)",
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
function contratflotteSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contratflottes_selectBy(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.flotteId,
        theReq.observations,
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
  contratflotteSelectByInModel,
  addContratFlotteInModel,
  updateContratFlotteInModel,
  selectByIdContratFlotteInModel,
  selectAllContratFlotteInModel,
  deleteContratFlotteInModel
}
