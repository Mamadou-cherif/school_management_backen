const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addTicketMatiereInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_insert(?,?,?)",
      [
        theReq.ticketId,
        theReq.matiereId,
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

function ticket_matiereSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_selectBy(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.ticketId,
        theReq.matiereId,
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


function deleteTicketMatiereInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_delete(?)",
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
function selectTicketMatiereById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_selectById(?)",
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



function disableTicketMatiereInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_disable(?,?,?)",
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

function updateTicketMatiereInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_update(?,?,?,?,?)",
      [
        theReq.id,
        theReq.ticketId,
        theReq.matiereId,
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

function selectAllTicketMatiere() {
  return new Promise((resolve, reject) => {

    connection.query("CALL ticket_matieres_selectAll(?,?,?)",
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
  addTicketMatiereInModel,
  deleteTicketMatiereInModel,
  disableTicketMatiereInModel,
  updateTicketMatiereInModel,
  selectTicketMatiereById,
  selectAllTicketMatiere,
  ticket_matiereSelectByInModel
}