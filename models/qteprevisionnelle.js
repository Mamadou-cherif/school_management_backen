const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function addQtePrevisionnelleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_insert(?,?,?,?,?,?,?,?)",
      [
        theReq.activiteId,
        theReq.papbId,
        theReq.paabId,
        theReq.qtePrevisionnelle,
        theReq.montantPrevisionnel,
        theReq.deviseId,
        theReq.observations,
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

function qteprevisionnelleSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.papbId,
        theReq.paabId,
        theReq.qtePrevisionnelle,
        theReq.montantPrevisionnel,
        theReq.deviseId,
        theReq.observations,
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


function deleteQtePrevisionnelleInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_delete(?)",
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
function getQtePrevisionnelleByIdInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_selectById(?)",
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


function disableQtePrevisionnelleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_disable(?,?,?)",
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


function updateQtePrevisionnelleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_update(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.activiteId,
        theReq.papbId,
        theReq.paabId,
        theReq.qtePrevisionnelle,
        theReq.montantPrevisionnel,
        theReq.deviseId,
        theReq.observations,
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



function getAllQtePrevisionnelleInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_selectAll(?,?,?)",
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

function selectPapbInModel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_selectPapb()",
      [


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


function slectActiviteInQtePrevByStrategieId(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_slectActiviteInQtePrevByStrategieId(?,?)",
      [
        theReq.strategieId,
        theReq.papbId,
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

function getLineByActiviteIdAndPapbIdInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_getLineByActiviteIdAndPapbId(?,?)",
      [
        theReq.activiteId,
        theReq.paabId,
      ],
      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else{
          resolve(results[0])
        }
      })
    )
  })
}

function selectPaabByPapbIdAndActiviteId(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_selectPaabByPapbIdAndActiviteId(?,?)",
      [
        theReq.papbId,
        theReq.activiteId,
      ],
      ((err, results, fields) => {
        if (err) {
          reject(err)
        }
        else{
          resolve(results[0])
        }
      })
    )
  })
}

function selectPaabByPapbIdInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL qteprevisionnelles_selectPaabByPapbId(?)",
      [
        theReq.papbId
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

function selectActiviteByPaabIdInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL qteprevisionnelles_selectActiviteByPaabId(?)",
      [
        theReq.paabId
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
  selectPapbInModel,
  getLineByActiviteIdAndPapbIdInModel,
  slectActiviteInQtePrevByStrategieId,
  selectPaabByPapbIdInModel,
  selectPaabByPapbIdAndActiviteId,
  selectActiviteByPaabIdInModel,
  addQtePrevisionnelleInModel,
  deleteQtePrevisionnelleInModel,
  disableQtePrevisionnelleInModel,
  updateQtePrevisionnelleInModel,
  getQtePrevisionnelleByIdInModel,
  getAllQtePrevisionnelleInModel,
  qteprevisionnelleSelectByInModel
}