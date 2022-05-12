const mysql = require("mysql2");
const config = require("../configs/dbconfig")
let connection = mysql.createConnection(config)
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

function getAllEvaluationInModel(theReq) {
  return new Promise((resolve, reject) => {

    connection.query("CALL evaluations_selectAll(?,?,?)",
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



// function getPaysByIdInModel(id){
//   return new Promise((resolve,reject)=> {

//     connection.query("CALL payss_selectById(?)",
//           [ 
//             id
//           ],

//       ((err,results, fields)=>{
//         if(err){
//           reject(err)
//         }
//         resolve(results[0])
//       })
//     )
//   })
// }


// function addPaysInModel(data){

//   return new Promise((resolve,reject)=> {
//     connection.query("CALL payss_insert(?,?,?,?)",
//           [
//             data.libelle,
//             data.indicatifTel,
//             data.deviseId,
//             data.creationUserId,
//           ],

//       ((err,results, fields)=>{
//         if(err){

//           reject(err)
//           //connection.end();
//         }
//         else{
//         resolve(results);
//         }

//       })
//     )
//   })
// }

// function updatePaysInModel(data){
//   return new Promise((resolve,reject)=> {
//     connection.query("CALL payss_update(?,?,?,?,?,?)",
//           [
//             data.id, 
//             data.libelle,
//             data.indicatifTel,
//             data.deviseId,
//             data.modifDate,
//             data.modifUserId,
//           ],

//       ((err,results, fields)=>{
//         if(err){

//           reject(err)
//           //connection.end();
//         }
//         else{
//         resolve(results);
//         }

//       })
//     )
//   })
// }
// function paysSelectByInModel(data){
//     return new Promise((resolve,reject)=> {
//       connection.query("CALL payss_selectBy(?,?,?,?,?,?,?,?,?,?,?)",
//             [
//              data.id,
//              data.libelle,
//              data.indicatifTel,
//              data.deviseId,
//              data.estActif,
//              data.creationDate,
//              data.creationUserId,
//              data.modifDate,
//              data.modifUserId, 
//              data.debutDonnees, 
//              data.finDonnees,
//             ],

//         ((err,results, fields)=>{
//           if(err){
//             reject(err)
//           }
//           resolve(results[0])
//         })
//       )
//     })
// }

// function deletePaysInModel(id){
//   return new Promise((resolve,reject)=> {

//     connection.query("CALL payss_delete(?)",
//           [ 
//             id,

//           ],

//       ((err,results, fields)=>{
//         if(err){
//           reject(err)
//         }
//         resolve(results[0])
//       })
//     )
//   })
//}

module.exports = {
  getAllEvaluationInModel,
  // getPaysByIdInModel,
  // addPaysInModel,
  // updatePaysInModel,
  // deletePaysInModel,
  // paysSelectByInModel
}