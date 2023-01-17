const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addTemplateTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_insert(?,?,?,?)",
      [
        theReq.templateId,
		    theReq.tacheId,
		    theReq.ordre,
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

function templatetacheSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.templateId,
        theReq.tacheId,
        theReq.ordre,
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

function getTemplateTacheByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectById(?)",
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
function selectLastAffecteByActiviteIdInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectLastAffecteByActiviteId(?)",
      [
        theReq.activiteId
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

function selectNextTacheInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectNextTache(?,?)",
      [
        theReq.templateId,
        theReq.ordre
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

function selectGrethanCurentOrdreInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectGrethanCurentOrdre(?,?)",
      [
        theReq.templateId,
        theReq.ordre
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

function selectFirstTacheInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectFirstTache(?)",
      [
        theReq.activiteId
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

function updateGreaterThanCurentOrdreInModel(theReq){
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_updateGreaterThanCurentOrdre(?,?)",
      [
        theReq.templateId,
        theReq.ordrePrecedent

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


function selectLastTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectLastTache(?,?)",
      [
        theReq.ordre,
        theReq.templateId
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


function selectTemplateTacheNotAffectedActiviteInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectTacheNotAffectedActiviteId(?,?)",
      [
        theReq.activiteId,
        theReq.templateId

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


function disableTemplateTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_disable(?,?,?)",
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


function updateTemplateTacheInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.templateId,
        theReq.tacheId,
        theReq.ordre,
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

function getAllTemplateTacheInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL templatetaches_selectAll(?,?,?)",
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
  addTemplateTacheInModel,
  updateGreaterThanCurentOrdreInModel,
  selectGrethanCurentOrdreInModel,
  selectLastTacheInModel,
  selectNextTacheInModel,
  selectFirstTacheInModel,
  selectLastAffecteByActiviteIdInModel,
  selectTemplateTacheNotAffectedActiviteInModel,
  disableTemplateTacheInModel,
  updateTemplateTacheInModel,
  getTemplateTacheByIdInModel,
  getAllTemplateTacheInModel,
  templatetacheSelectByInModel
}