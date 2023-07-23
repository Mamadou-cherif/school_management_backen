const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function getSupperviseurNotAffectedToEquipe(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_getSupperviseurNotAffectedToEquipe(?)",
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

function getPersonnelNotAffectedToEquipe(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL personnels_getPersonnelNotAffectedToEquipe(?)",
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

function selectByIdEquipeInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipes_selectById(?)",
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

function selectAllEquipeInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipes_selectAll(?,?,?)",
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

function addEquipeInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipes_insert(?,?,?,?,?,?,?)",
      [
        theReq.contratId,
        theReq.superviseurId,
        theReq.libelle,
        theReq.observations,
        theReq.heureFin,
        theReq.heureDebut,
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

function updateEquipeInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipes_update(?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.superviseurId,
        theReq.libelle,
        theReq.observations,
        theReq.heureFin,
        theReq.heureDebut,
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


function deleteEquipeInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL equipes_delete(?)",
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
function equipeSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipes_selectBy(? ,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.contratId,
        theReq.superviseurId,
        theReq.libelle,
        theReq.observations,
        theReq.heureFin,
        theReq.heureDebut,
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
  equipeSelectByInModel,
  getSupperviseurNotAffectedToEquipe,
  getPersonnelNotAffectedToEquipe,
  addEquipeInModel,
  updateEquipeInModel,
  selectByIdEquipeInModel,
  selectAllEquipeInModel,
  deleteEquipeInModel
}
