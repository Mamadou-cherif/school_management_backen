const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function selectByIdCamionChauffeurInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionschauffeurs_selectById(?)",
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

function selectAllCamionChauffeurInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionschauffeurs_selectAll(?,?,?)",
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

function getChauffeurByFlotteId(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionschauffeurs_getChauffeurByFlotteId(?)",
      [
       theReq.flotteId
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
function addCamionChauffeurInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionschauffeurs_insert(?,?,?,?)",
      [
        theReq.chauffeurId,
        theReq.camionId,
        theReq.estTitulaire,
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

function updateCamionChauffeurInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionschauffeurs_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.chauffeurId,
        theReq.camionId,
        theReq.estTitulaire,
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
function deleteCamionChauffeurInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL camionschauffeurs_delete(?)",
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
function camionchauffeurSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionschauffeurs_selectBy(? ,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.chauffeurId,
        theReq.camionId,
        theReq.estTitulaire,
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
  camionchauffeurSelectByInModel,
  getChauffeurByFlotteId,
  addCamionChauffeurInModel,
  updateCamionChauffeurInModel,
  selectByIdCamionChauffeurInModel,
  selectAllCamionChauffeurInModel,
  deleteCamionChauffeurInModel
}
