const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addTicketInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_insert(?,?,?,?,?,?)",
      [
        theReq.sessionId,
        theReq.classeId,
        theReq.libelle,
        theReq.typeEvaluation,
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

function ticketSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sessionId,
        theReq.classeId,
        theReq.libelle,
        theReq.typeEvaluation,
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


function deleteTicketInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_delete(?)",
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
function selectTicketById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_selectById(?)",
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



function disableTicketInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_disable(?,?,?)",
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

function updateTicketInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.sessionId,
        theReq.classeId,
        theReq.libelle,
        theReq.typeEvaluation,
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

function selectAllTicket() {
  return new Promise((resolve, reject) => {

    connection.query("CALL tickets_selectAll(?,?,?)",
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
  addTicketInModel,
  deleteTicketInModel,
  disableTicketInModel,
  updateTicketInModel,
  selectTicketById,
  selectAllTicket,
  ticketSelectByInModel
}