const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function addValeurCibleInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL valeurcibles_insert(?,?,?,?,?,?)",
      [
        data.indicateurId,
        data.anneeCibleId,
        data.anneeReelle,
        data.valeurProjetee,
        data.observations,
        data.creationUserId,
      ],

      ((err, results, fields) => {
        if (err) {
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

function valeurCibleSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL valeurcibles_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.indicateurId,
        data.anneeCibleId,
        data.anneeReelle,
        data.valeurProjetee,
        data.observations,
        data.estActif,
        data.creationDate,
        data.creationUserId,
        data.modifDate,
        data.modifUserId,
        data.debut,
        data.fin,
      ],

      ((err, results, fields) => {
        if (err) {
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


function updateValeurCibleInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL valeurcibles_update(?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.indicateurId,
        data.anneeCibleId,
        data.anneeReelle,
        data.valeurProjetee,
        data.observations,
        data.modifDate,
        data.modifUserId,
      ],

      ((err, results, fields) => {
        if (err) {

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
function deleteValeurCibleInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL valeurcibles_delete(?)",
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

function disableValeurCibleInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL valeurcibles_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

      ],

      ((err, results, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }

      })
    )
  })
}


function valeurcibleSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL valeurcibles_selectBy(? ,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.id,
        data.indicateurId,
        data.anneeCibleId,
        data.anneeReelle,
        data.valeurProjetee,
        data.observations,
        data.estActif,
        data.creationDate,
        data.creationUserId,
        data.modifDate,
        data.modifUserId,
        data.debutDonnees,
        data.finDonnees
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



function selectAllValeurInModel(theReq) {
    return new Promise((resolve, reject) => {
      connection.query("CALL valeurcibles_selectAll(?,?,?)",
        [
          1,
          null,
          null
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

  function selectValeurCibleByProjetIdInModel(id) {
    return new Promise((resolve, reject) => {
      connection.query("CALL valeurcibles_selectByProjetId(?)",
        [
         id
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

  function getAsingleValeurCibleInModel(id) {
    return new Promise((resolve, reject) => {
  
      connection.query("CALL valeurcibles_selectById(?)",
        [
          id
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


  module.exports = {
    selectAllValeurInModel,
    selectValeurCibleByProjetIdInModel,
    addValeurCibleInModel,
    valeurcibleSelectByInModel,
    updateValeurCibleInModel,
    deleteValeurCibleInModel,
    disableValeurCibleInModel,
    getAsingleValeurCibleInModel,
    valeurCibleSelectByInModel
  }
  