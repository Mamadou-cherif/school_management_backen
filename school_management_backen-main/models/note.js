const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addNoteInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_insert(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.ticketId,
        theReq.eleveId,
        theReq.matiereId,
        theReq.valeur,
        theReq.semestre,
        theReq.mois,
        theReq.isOral,
        theReq.isEcrit,
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

function noteSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.ticketId,
        theReq.eleveId,
        theReq.matiereId,
        theReq.valeur,
        theReq.semestre,
        theReq.mois,
        theReq.isOral,
        theReq.isEcrit,
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

function calculeMoyenneParClasseEtSession(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_calculeMoyenneParClasseEtSession(?,?)",
      [
        theReq.classeId,
        theReq.sessionId
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

function getMoyenneByTicketAndEleveId(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_getMoyenneByTicketAndEleveId(?,?)",
      [
        theReq.ticketId,
        theReq.eleveId
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
function deleteNoteInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_delete(?)",
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
function selectNoteById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_selectById(?)",
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



function disableNoteInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_disable(?,?,?)",
      [
        theReq.id,
        theReq.modifUserId,
        theReq.modifDate,

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

function updateNoteInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_update(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.ticketId,
        theReq.eleveId,
        theReq.matiereId,
        theReq.valeur,
        theReq.semestre,
        theReq.mois,
        theReq.isOral,
        theReq.isEcrit,
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

function selectAllNote() {
  return new Promise((resolve, reject) => {

    connection.query("CALL notes_selectAll(?,?,?)",
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
  addNoteInModel,
  calculeMoyenneParClasseEtSession,
  deleteNoteInModel,
  disableNoteInModel,
  updateNoteInModel,
  selectNoteById,
  selectAllNote,
  getMoyenneByTicketAndEleveId,
  noteSelectByInModel
}