const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)

function selectByIdEquipesPersonnelInModel(id) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipespersonnels_selectById(?)",
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

function selectAllEquipesPersonnelInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipespersonnels_selectAll(?,?,?)",
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


function addEquipesPersonnelInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipespersonnels_insert(?,?,?,?,?)",
      [
        theReq.equipeId,
			  theReq.personnelId,
			  theReq.debut,
			  theReq.fin,
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

function updateEquipesPersonnelInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipespersonnels_update(?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.equipeId,
			  theReq.personnelId,
			  theReq.debut,
			  theReq.fin,
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
function deleteEquipesPersonnelInModel(id) {
  return new Promise((resolve, reject) => {

    connection.query("CALL equipespersonnels_delete(?)",
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
function equipespersonnelSelectByInModel(theReq) {
  return new Promise((resolve, reject) => {
    connection.query("CALL equipespersonnels_selectBy(?,?,?,?,?,?,?,?,?,?)",
      [
        theReq.id,
        theReq.equipeId,
			  theReq.personnelId,
			  theReq.debut,
			  theReq.fin,
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
  equipespersonnelSelectByInModel,
  addEquipesPersonnelInModel,
  updateEquipesPersonnelInModel,
  selectByIdEquipesPersonnelInModel,
  selectAllEquipesPersonnelInModel,
  deleteEquipesPersonnelInModel
}
