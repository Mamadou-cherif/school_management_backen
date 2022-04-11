const mysql= require("mysql2");
const config= require("../configs/dbconfig")
let connection= mysql.createConnection(config)
const express= require("express")
const app= express();
const bcrypt= require("bcrypt");
const res = require("express/lib/response");
const { reject } = require("bcrypt/promises");

 

function checkIfMenuExists(theReq){
  return new Promise((resolve,reject)=> {
      
    connection.query("CALL menus_selectBy(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            theReq.id,
            theReq.reference,
            theReq.libelle,
            theReq.descriptions,
            theReq.url,
            theReq.menuPerId,
            theReq.ordre,
            theReq.typeMenu,
            theReq.image,
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

function getMenuPereInModel(){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL menus_getMenuPere()", 
                      [
                       
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

function addMenuInModel(theReq){
  return new Promise((resolve, reject)=>{

    
          connection.query("CALL menus_insert(?,?,?,?,?,?,?,?,?)", 
                      [
                        theReq.body.reference,
                        theReq.body.libelle,
                        theReq.body.descriptions,
                        theReq.body.url,
                        theReq.body.menuPerId,
                        theReq.body.ordre,
                        theReq.body.typeMenu,
                        theReq.body.image,
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
function disableMenuInModel(theReq, theResponse){
  return new Promise((reject, resolve)=>{

    connection.query("CALL menus_disable(?,?,?)",
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


function getMenuFilsByGroupeInModel(theReq){
  return new Promise((reject, resolve)=>{

    connection.query("CALL menus_getMenuFilsByGroupe(?,?)",
     [  
         theReq.body.menuPereId,
         theReq.body.groupeId
      ],
      (err, results, fields)=>{
        if(err){
          reject(err)
        }
        else{
           resolve(results[0])
        }
      })
  })
}

module.exports= {
    checkIfMenuExists,
    addMenuInModel,
    disableMenuInModel,
    getMenuPereInModel,
    getMenuFilsByGroupeInModel
}