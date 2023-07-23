const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function getCamionInSiteByFlotteId(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camions_getCamionInSiteByFlotteId(?,?)",
      [
        theReq.flotteId,
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

function selectByIdCamionInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camions_selectById(?)",
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

function selectAllCamionInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camions_selectAll(?,?,?)",
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

function addCamionInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camions_insert(?,?,?,?,?,?,?)",
      [
        theReq.libelle,
        theReq.flotteId,
        theReq.titulaire,
        theReq.capaciteThBenne,
        theReq.immatriculation,
        theReq.radar,
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

function updateCamionInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camions_update(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.flotteId,
        theReq.titulaire,
        theReq.capaciteThBenne,
        theReq.immatriculation,
        theReq.radar,
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
function deleteCamionInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL camions_delete(?)",
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
function camionSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camions_selectBy(? ,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.libelle,
        theReq.flotteId,
        theReq.titulaire,
        theReq.capaciteThBenne,
        theReq.immatriculation,
        theReq.radar,
        theReq.estActif,
        theReq.creationDate,
        theReq.creationUserId,
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




module.exports = {
  camionSelectByInModel,
  getCamionInSiteByFlotteId,
  addCamionInModel,
  updateCamionInModel,
  selectByIdCamionInModel,
  selectAllCamionInModel,
  deleteCamionInModel
}
