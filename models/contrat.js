const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function selectByIdContratInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contrats_selectById(?)",
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

function selectAllContratInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contrats_selectAll(?,?,?)",
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






function addContratInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contrats_insert(?,?,?,?,?,?)",
      [
        theReq.localisationId,
        theReq.debut,
        theReq.libelle,
        theReq.documentLink,
        theReq.objectifs,
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


function updateContratInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contrats_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.localisationId,
        theReq.debut,
        theReq.libelle,
        theReq.documentLink,
        theReq.objectifs,
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


function deleteContratInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL contrats_delete(?)",
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


function contratSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL contrats_selectBy(? ,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.localisationId,
        theReq.debut,
        theReq.libelle,
        theReq.documentLink,
        theReq.objectifs,
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
  contratSelectByInModel,
  addContratInModel,
  updateContratInModel,
  selectByIdContratInModel,
  selectAllContratInModel,
  deleteContratInModel
}
