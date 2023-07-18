const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function selectByIdCamionSiteInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionsites_selectById(?)",
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

function selectAllCamionSiteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionsites_selectAll(?,?,?)",
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
    connection.query("CALL camionsites_getChauffeurBySiteId(?)",
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
function addCamionSiteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionsites_insert(?,?,?,?)",
      [
        theReq.camionId,
			  theReq.siteId,
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

function updateCamionSiteInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionsites_update(?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.camionId,
			  theReq.siteId,
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
function deleteCamionSiteInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL camionsites_delete(?)",
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
function camionsiteSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL camionsites_selectBy(? ,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.camionId,
			  theReq.siteId,
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
  camionsiteSelectByInModel,
  getChauffeurBySiteId,
  addCamionSiteInModel,
  updateCamionSiteInModel,
  selectByIdCamionSiteInModel,
  selectAllCamionSiteInModel,
  deleteCamionSiteInModel
}
