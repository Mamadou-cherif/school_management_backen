const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 

function checkIfModeAccesExists(theReq){
  return new Promise((resolve,reject)=> {
      
    connection.query("CALL modeaccess_selectBy(?,? ,?,?,?,?,?,?,?)",
          [
           theReq.id,
           theReq.libelle,
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


function addModeAccesInModel(theReq){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL modeaccess_insert(?,?)", 
                      [
                        theReq.body.libelle,
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

function getAllModeAccessInModel(theReq){
  return new Promise((resolve,reject)=> {
    
    connection.query("CALL modeaccess_selectAll(?,?,?)",
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

//supression en logique d'un utilisateur
function disableModeAccesInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL modeaccess_disable(?,?,?)",
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
    checkIfModeAccesExists,
    addModeAccesInModel,
    disableModeAccesInModel,
    getAllModeAccessInModel

}