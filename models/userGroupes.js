const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 
function checkIfUserGroupeExists(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL usergroupes_selectBy(?,? ,?,?,?,?,?,?,?,?)",
          [
           theReq.id,
           theReq.userId,
           theReq.groupeId,
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

 
function addUserGroupeInModel(theReq){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL usergroupes_insert(?,?,?)", 
                      [
                        theReq.body.userId,
                        theReq.body.groupeId,
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

//supression en du

function deleteUserGroupeInModel(id){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL usergroupes_delete(?)",
          [ 
            id        
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
//supression en logique d'un utilisateur
function disableUserGroupeInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL usergroupes_disable(?,?,?)",
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

function updateUserGroupeInModel(theReq, theResponse){
   console.log(theReq.body)
  return new Promise((resolve, reject)=>{ 
    
    
          connection.query("CALL usergroupes_update(?,?,?,?)", 
                      [
                        
                        theReq.body.id,
                        theReq.body.userId,
                        theReq.body.groupeId,
                        theReq.body.modifDate,
                        theReq.body.modifUserId
                      ]
                  ,
                  (err, results, fields)=>{
                    if(err){

                     theResponse.status(400).json({error: "echec de la modification"})
                    }
                    else{
                      theResponse.status(200).json({error: "succes de la modification"})
                     
                    }
            
          })
     
    })
}


function getAsingleUserGroupeInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL usergroupes_selectById(?)",
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

function getAllUserGroupesInModel(theReq){
  return new Promise((resolve,reject)=> {
    connection.query("CALL usergroupes_selectAll(?,?,?)",
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


function activateUserGroupe(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL usergroupes_activate(?,?,?)",
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


module.exports= {
    updateUserGroupeInModel,
    checkIfUserGroupeExists,
    addUserGroupeInModel,
    deleteUserGroupeInModel,
    disableUserGroupeInModel,
    getAsingleUserGroupeInModel,
    getAllUserGroupesInModel,
    activateUserGroupe,
}