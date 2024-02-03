const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addNatureInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_insert(?,?,?)",
      [
        theReq.libelle,
		  theReq.code,
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

function natureSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
		theReq.code,
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


function deleteNatureInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_delete(?)",
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
function getNatureByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_selectById(?)",
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


function disableNatureInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_disable(?,?,?)",
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

function updateNatureInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_update(?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
		    theReq.code,
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

function getAllNatureInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL natures_selectAll(?,?,?)",
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
  addNatureInModel,
  deleteNatureInModel,
  disableNatureInModel,
  updateNatureInModel,
  getNatureByIdInModel,
  getAllNatureInModel,
  natureSelectByInModel
}