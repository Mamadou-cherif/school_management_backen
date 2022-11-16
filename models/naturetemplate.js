const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addNatureTemplateInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_insert(?,?,?)",
      [
        theReq.templateId,
		theReq.natureId,
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

function naturetemplateSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.templateId,
	    	theReq.natureId,
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


function deleteNatureTemplateInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_delete(?)",
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
function getNatureTemplateByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_selectById(?)",
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


function disableNatureTemplateInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_disable(?,?,?)",
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

function updateNatureTemplateInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_update(?,?,?,?,?)",
      [
        theReq.id,
        theReq.templateId,
		theReq.natureId,
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

function getAllNatureTemplateInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL naturetemplates_selectAll(?,?,?)",
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
  addNatureTemplateInModel,
  deleteNatureTemplateInModel,
  disableNatureTemplateInModel,
  updateNatureTemplateInModel,
  getNatureTemplateByIdInModel,
  getAllNatureTemplateInModel,
  naturetemplateSelectByInModel
}