const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 
// revoir les paramètres des fonctions marquée en rouges
function checkIfGroupeExists(theReq){
  return new Promise((resolve,reject)=> {
      
    connection.query("CALL groupes_selectBy(?,? ,?,?,?,?,?,?,?,?)",
          [
           theReq.id,
           theReq.libelle,
           theReq.observations,
           theReq.estActif,
           theReq.creationDate,
           theReq.creationUserId,
           theReq.modifDate,
           theReq.modifUserId,
           theReq.debutDonnees,
           theReq.finDonnees
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function addGroupeInModel(theReq){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL groupes_insert(?,?,?)", 
                      [
                        theReq.body.libelle,
                        theReq.body.prestataireId,
                        theReq.body.creationUserId,
                      
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                      reject(err)
                      //connection.end();
                    }
                    else{
                    resolve(results);}
                    // connection.end()
            
          })
   
    })
  
}

//supression en dur
function deleteGroupeInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL groupes_delete(?)",
     [
       theReq.body.id
     ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({succes: "La suppression en dur a échoué"})
        }         
          theResponse.status(200).json({succes: "La suppression en dur a bien reussie"})
      })
  })
}

//supression en logique d'un utilisateur
function disableGroupeInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL groupes_disable(?,?,?)",
     [  
         theReq.body.id,
         theReq.body.modifUserId,
         theReq.body.modifDate
      ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({succes: "La suppression logique a échoué"})
        }
        else{
          theResponse.status(200).json({succes: "La suppression logique a bien reussie"})
        }
      })
  })
}

function updateGroupeInModel(theReq, theResponse){
  return new Promise((resolve, reject)=>{

    connection.query("CALL groupes_update(?,?,?,?)", 
                      [
                      
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                     reject(err)
                    }
                    resolve(results)
            
          })
     
    })
}


function getAsingleGroupeInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL groupes_selectById(?)",
          [
            theReq.params.id
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })

}

function getAllGroupesInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL groupes_selectAll(?,?,?)",
          [
            theReq.body.estActif,
            theReq.body.debut,
            theReq.body.fin
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
        resolve(results[0])
      })
    )
  })
}


function activateGroupe(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL groupes_activate(?,?,?)",
     [  
         theReq.body.id,
         theReq.body.modifUserId,
         theReq.body.modifDate
      ],
      (err, results, fields)=>{
        if(err){
          theResponse.status(400).json({error: "activation du compte echec"})
        }
        else{
          theResponse.status(200).json({succes: "l'activation du compte a reussi"})
        }
      }) 
  })
}

// function addAuserConnexionInstance(theReq){
//   return new Promise((reject, resolve)=>{
    
//     connection.query("CALL userconnexions_insert(?,?,?,?)",
//      [  
//          theReq.userId,
//          theReq.adressIp,
//          theReq.fin,
//          theReq.creationUserId
         
//       ],
//       (err, results, fields)=>{
//         if(err){
//           resolve(err)
//         }
//         else{
//           resolve(results)
//         }
//       }) 
//   })
// }

// function UpdateGroupeConnexionInstance(theReq){
  
//   return new Promise((reject, resolve)=>{
//     connection.query("CALL userconnexions_update(?,?,?,?)",
//      [  
//          theReq.body.userId,
//          null,
//          theReq.body.fin,
//          theReq.body.modifUserId
         
//       ],
//       (err, results, fields)=>{
//         if(err){
//           resolve(err)
//         }
//         else{
//           resolve(results)
//         }
//       }) 
//   })
// }

module.exports= {
    updateGroupeInModel,
    checkIfGroupeExists,
    addGroupeInModel,
    deleteGroupeInModel,
    disableGroupeInModel,
    getAsingleGroupeInModel,
    getAllGroupesInModel,
    activateGroupe,
}