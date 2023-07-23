const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function selectByIdPersonnelInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_selectById(?)",
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

function selectAllPersonnelInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_selectAll(?,?,?)",
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
    connection.query("CALL personnels_getChauffeurByFlotteId(?)",
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


function getChauffeurNotAffectedToEquipe(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_getChauffeurNotAffectedToEquipe(?)",
      [
       theReq.contratId
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

function getChauffeurNotAffectedToCamionToAFlotte(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_getChauffeurNotAffectedToCamionToAFlotte(?)",
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

function getChauffeurNotAffectedToCamionToASite(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_getChauffeurNotAffectedToCamionToASite(?)",
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

function addPersonnelInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_insert(?,?,?,?,?,?,?,?,?)",
      [
        theReq.nom,
        theReq.prenoms,
        theReq.telephone,
        theReq.email,
        theReq.contratId,
        theReq.flotteId,
        theReq.typeFonctionId,
        theReq.statut,
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


function updatePersonnelInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_update(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.nom,
        theReq.prenoms,
        theReq.telephone,
        theReq.email,
        theReq.contratId,
        theReq.flotteId,
        theReq.typeFonctionId,
        theReq.statut,
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


function deletePersonnelInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL personnels_delete(?)",
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


function personnelSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_selectBy(? ,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.nom,
        theReq.prenoms,
        theReq.telephone,
        theReq.email,
        theReq.contratId,
        theReq.flotteId,
        theReq.typeFonctionId,
        theReq.statut,
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
  personnelSelectByInModel,
  getChauffeurNotAffectedToCamionToASite,
  getChauffeurNotAffectedToEquipe,
  getChauffeurNotAffectedToCamionToAFlotte,
  getChauffeurByFlotteId,
  addPersonnelInModel,
  updatePersonnelInModel,
  selectByIdPersonnelInModel,
  selectAllPersonnelInModel,
  deletePersonnelInModel
}
