const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)


function addClassseInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL classses_insert(?,?,?,?,?,?)",
      [
        theReq.ecoleId,
        theReq.enseignantId,
        theReq.niveau,
        theReq.etape,
        theReq.libelle,
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

function classseSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL classses_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.ecoleId,
        theReq.enseignantId,
        theReq.niveau,
        theReq.etape,
        theReq.libelle,
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


function deleteClassseInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL classses_delete(?)",
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


// function disableClassseInModel(theReq) {
//   console.log(theReq)
//   return new Promise((resolve, reject) => {
//     connection.query("CALL classses_disable(?,?,?)",
//       [
//         theReq.id,
//         theReq.modifUserId,
//         theReq.modifDate,

//       ],

//       ((err, results, fields) => {
//         if (err) {
//             console.log(err)
//           reject(err)
//         }
//         else{
//             resolve(results[0])
//         }
//       })
//     )
//   })
// }

function selectClassseById(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL classses_selectById(?)",
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


function disableClassseInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL classses_disable(?,?,?)",
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

function updateClassseInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL classses_update(?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.ecoleId,
        theReq.enseignantId,
        theReq.niveau,
        theReq.etape,
        theReq.libelle,
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

function selectAllClassse() {
  return new Promise((resolve, reject) => {

    connection.query("CALL classses_selectAll(?,?,?)",
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
  addClassseInModel,
  deleteClassseInModel,
  disableClassseInModel,
  updateClassseInModel,
  selectClassseById,
  selectAllClassse,
  classseSelectByInModel
}