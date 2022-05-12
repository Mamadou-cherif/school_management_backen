const Groupe= require("../models/groupes")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initGroupeClass= require("../classes/groupes")


function addGroupe(req, res,next){
      
         
        
        initGroupeClass.groupe.id= req.body.id
        initGroupeClass.groupe.libelle= req.body.libelle
       // initGroupeClass.groupe.observations= req.body.observations
     //verifie si l'utilisateur existe en base
     Groupe.checkIfGroupeExists(initGroupeClass.groupe)
          .then(groupe=> {
                if(groupe.length==0){
                      Groupe.addGroupeInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Le groupe existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}





//supression en dur
function deleteGroupe(req, res, next){
    
   Groupe.deleteGroupeInModel(req,res)
}

//supression logique d'un utilisateur
function disableGroupe(req, res, next){
    Groupe.disableGroupeInModel(req,res)
}



function updateGroupe(req,res, next){
    
    initGroupeClass.groupe.libelle= req.body.libelle

     Groupe.checkIfGroupeExists(initGroupeClass.groupe)
         .then(data=>{
                  if((data.length==0) || (data[0].id== req.body.id)){
                   Groupe.updateGroupeInModel(req, res)
                      .then(()=>res.status(200).json({succes: "La modification du groupe a réussi"}))
                      .catch(error=> res.status(400).json(error))
                  }
                  else{
                      res.status(400).json({error: "ce groupe existe deja dans notre systeme"});
                  }
             })


}

function getAsingleGroupe(req, res, next){
    Groupe.getAsingleGroupeInModel(req)
        .then(groupes=> res.status(200).json(groupes))
        .catch(error=> res.status(400).json(error))
}


function getAllGroupes(req,res, next){ 
 
     Groupe.getAllGroupesInModel(req)
        .then(groupes=> res.status(200).json(groupes))
        .catch(error=> res.status(400).json(error))
}


 function activateGroupe(req, res, next){
    Groupe.activateGroupe(req, res)
    
}



 
module.exports={
    disableGroupe,
    deleteGroupe,
    addGroupe,
    updateGroupe,
    getAsingleGroupe,
    getAllGroupes,
    activateGroupe,
}