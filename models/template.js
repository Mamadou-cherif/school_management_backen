const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addTemplateInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_insert(?,?)",
      [
        theReq.libelle,
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

function templateSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_selectBy(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
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


function deleteTemplateInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_delete(?)",
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
function getTemplateByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_selectById(?)",
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


function disableTemplateInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_disable(?,?,?)",
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

function updateTemplateInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_update(?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
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

function getAllTemplateInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL templates_selectAll(?,?,?)",
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
  addTemplateInModel,
  deleteTemplateInModel,
  disableTemplateInModel,
  updateTemplateInModel,
  getTemplateByIdInModel,
  getAllTemplateInModel,
  templateSelectByInModel
}