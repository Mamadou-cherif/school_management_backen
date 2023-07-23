const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function selectByIdBonLivraisonInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_selectById(?)",
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

function selectAllBonLivraisonInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_selectAll(?,?,?)",
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

function getChauffeurBySiteId(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_getChauffeurBySiteId(?)",
      [
       theReq.siteId
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
function addBonLivraisonInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.contratId,
        theReq.flotteId,
        theReq.camionId,
        theReq.chauffeurId,
        theReq.trajetId,
        theReq.equipeId,
        theReq.numeroBl,
        theReq.dateChargement,
        theReq.heure,
        theReq.poidsChargee,
        theReq.poidsVide,
        theReq.tonnageSurBon,
        theReq.statutBon,
        theReq.distanceMine,
        theReq.observations,
        theReq.creationUserId,
      ],

      ((err, results, fields) => {
        if (err) {
            console.log()
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

function updateBonLivraisonInModel(theReq) {
  console.log(theReq)
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.flotteId,
        theReq.camionId,
        theReq.chauffeurId,
        theReq.trajetId,
        theReq.equipeId,
        theReq.numeroBl,
        theReq.dateChargement,
        theReq.heure,
        theReq.poidsChargee,
        theReq.poidsVide,
        theReq.tonnageSurBon,
        theReq.statutBon,
        theReq.distanceMine,
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
          resolve(results);
        }

      })
    )
  })
}

function deleteBonLivraisonInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_delete(?)",
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
function getPointageToEexportToExcel() {
  return new Promise((resolve, reject) => {

    connection.query("CALL bonlivraisons_getPointageToEexportToExcel()",
      [

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

function getPointageToExportByDay(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL bonlivraisons_getPointageToExportByDay(?)",
      [
        theReq.dateChargement
      ],

      ((err, results, fields) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        else {
          resolve(results[0]);
        }
      })
    )
  })
}
function bonlivraisonSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL bonlivraisons_selectBy(?,?,?,? ,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.flotteId,
        theReq.camionId,
        theReq.chauffeurId,
        theReq.trajetId,
        theReq.equipeId,
        theReq.numeroBl,
        theReq.dateChargement,
        theReq.heure,
        theReq.poidsChargee,
        theReq.poidsVide,
        theReq.tonnageSurBon,
        theReq.statutBon,
        theReq.distanceMine,
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
  getPointageToEexportToExcel,
  getPointageToExportByDay,
  bonlivraisonSelectByInModel,
  getChauffeurBySiteId,
  addBonLivraisonInModel,
  updateBonLivraisonInModel,
  selectByIdBonLivraisonInModel,
  selectAllBonLivraisonInModel,
  deleteBonLivraisonInModel
}
