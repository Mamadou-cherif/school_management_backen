const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 
//  function checkIfUserExists(theReq){
//     return new Promise((resolve,reject)=> {
//       connection.query("CALL users_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//             [
//               theReq.id,
//               theReq.structureId,
//               theReq.prestataireId,
//               theReq.nom,
//               theReq.prenoms,
//               theReq.fonction,
//               theReq.telephone1,
//               theReq.telephone2,
//               theReq.email,
//               theReq.photo,
//               theReq.password,
//               theReq.quartierdistrictId,
//               theReq.observations,
//               theReq.estAlerte,
//               theReq.estSuspendu,
//               theReq.estActif,
//               theReq.creationDate,
//               theReq.creationUserId,
//               theReq.modifDate,
//               theReq.modifUserId,
//               theReq.debutDonnees,
//               theReq.finDonnees
//             ],
  
//         ((err,results, fields)=>{
//           if(err){
//             reject(err)
//           }
//           resolve(results[0])
//         })
//       )
//     })
//   }

function checkIfUserExists(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL users_selectBy(?,? ,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            theReq.id,
            theReq.structureId,
            theReq.prestataireId,
            theReq.nom,
            theReq.prenoms,
            theReq.fonction,
            theReq.telephone1,
            theReq.telephone2,
            theReq.email,
            theReq.photo,
            theReq.password,
            theReq.quartierdistrictId,
            theReq.observations,
            theReq.estAlerte,
            theReq.estSuspendu,
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


function getNbAuthenticateInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_getNbAuthenticate(?,?)",
          [
            theReq.telephone1,
            theReq.motDePasse
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

function getAuthenticateInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL users_getAuthenticate(?,?)",
          [
            theReq.telephone1,
            theReq.motDePasse
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


function addUserInModel(theReq){
  return new Promise((resolve, reject)=>{

          connection.query("CALL users_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                      [
                        theReq.structureId,
                        theReq.prestataireId,
                        theReq.nom,
                        theReq.prenoms,
                        theReq.fonction,
                        theReq.telephone1,
                        theReq.telephone2,
                        theReq.email,
                        theReq.photo,
                        theReq.password,
                        theReq.quartierdistrictId,
                        theReq.observations,
                        theReq.estAlerte,
                        theReq.estSuspendu,
                        theReq.creationUserId
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                      reject(err)
                      //connection.end();
                    }
                    else{
                    resolve(results[0]);}
                    // connection.end()
            
          })
     
    })
  
}

//supression en dur
function deleteUserInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL users_delete(?)",
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
function disableUserInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL users_disable(?,?,?)",
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

function updateUserInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [ 
                      theReq.id,
                      theReq.structureId,
                      theReq.prestataireId,
                      theReq.nom,
                      theReq.prenoms,
                      theReq.fonction,
                      theReq.telephone1,
                      theReq.telephone2,
                      theReq.email,
                      theReq.photo,
                      theReq.password,
                      theReq.quartierdistrictId,
                      theReq.observations,
                      theReq.estAlerte,
                      theReq.estSuspendu,
                      theReq.modifDate,
                      theReq.modifUserId          
          ],

      ((err,results, fields)=>{
        if(err){
          reject(err)
        }
       // console.log(results[0])
        resolve(results[0])
      })
    )
  })
}




function getAsingleUserInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_selectById(?)",
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

function getAllUsersInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL users_selectAll(?,?,?)",
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


function activateUser(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL users_activate(?,?,?)",
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



function UpdateUserConnexionInstance(theReq){
  
  return new Promise((reject, resolve)=>{
    connection.query("CALL userconnexions_update(?,?,?,?)",
     [  
         theReq.body.userId,
         null,
         theReq.body.fin,
         theReq.body.modifUserId
         
      ],
      (err, results, fields)=>{
        if(err){
          resolve(err)
        }
        else{
          resolve(results)
        }
      }) 
  })
}
 
function userUpdatePasswordInModel(theReq, theRes){
  return new Promise((reject, resolve)=>{
    connection.query("CALL users_updatePassword(?,?,?)",
     [  
         theReq.id,
         theReq.newMotDePasse,
         theReq.modifUserId
         
      ],
      (err, results, fields)=>{
        if(err){
          
          theRes.status(400).json({error: "mise à jour echec"})
        }
        else{
          
          theRes.status(200).json({succes: "mise à jour faite avec succes"})
        }
      })
  })
}


function getAffecteByGroupInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL users_getAffecteByGroupe(?)",
          [             
            theReq.body.groupeId
            
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

function getNonAffecteByGroupInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL users_getNonAffecteByGroupe(?)",
          [             
            theReq.body.groupeId
            
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
module.exports= {
    getAffecteByGroupInModel,
    getNonAffecteByGroupInModel,
    updateUserInModel,
    checkIfUserExists,
    addUserInModel,
    deleteUserInModel,
    disableUserInModel,
    getAsingleUserInModel,
    getAllUsersInModel,
    activateUser,
    UpdateUserConnexionInstance,
    getNbAuthenticateInModel,
    getAuthenticateInModel,
    userUpdatePasswordInModel
}