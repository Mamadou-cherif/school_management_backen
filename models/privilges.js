const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 

function checkIfPrivilegeExists(theReq){
  return new Promise((resolve,reject)=> {
      
    connection.query("CALL privileges_selectBy(?,? ,?,?,?,?,?,?,?,?)",
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


function addPrivilegeInModel(theReq){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL privileges_insert(?,?,?)", 
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

//supression en logique d'un utilisateur
function disablePrivilegeInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL privileges_disable(?,?,?)",
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


module.exports= {
    checkIfPrivilegeExists,
    addPrivilegeInModel,
    disablePrivilegeInModel,

}