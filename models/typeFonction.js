const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)



function selectByIdtypeFonctionsInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL type_fonctions_selectById(?)",
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

function selectAlltypeFonctionsInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL type_fonctions_selectAll(?,?,?)",
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

function addtypeFonctionsInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL type_fonctions_insert(?,?,?)",
      [
        data.libelle,
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

function updatetypeFonctionsInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL type_fonctions_update(?,?,?,?,?)",
      [
        data.id,
        data.libelle,
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
function deletetypeFonctionsInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL type_fonctions_delete(?)",
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
function type_fonctionsSelectByInModel(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL type_fonctions_selectBy(? ,?,?,?,?,?,?,?)",
      [
        data.id,
        data.libelle,
        data.observations,
        data.estActif,
        data.creationDate,
        data.creationUserId,
        data.modifDate,
        data.modifUserId
     
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
  type_fonctionsSelectByInModel,
  addtypeFonctionsInModel,
  updatetypeFonctionsInModel,
  selectByIdtypeFonctionsInModel,
  selectAlltypeFonctionsInModel,
  deletetypeFonctionsInModel
}
