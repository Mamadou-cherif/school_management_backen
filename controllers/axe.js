const Axe= require("../models/axe")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initAxeClass= require("../classes/axe")


function addAxe(req, res,next){
      
         
        

    initAxeClass.libelle= req.body.libelle
       
     //verifie si l'utilisateur existe en base
     Axe.checkIfAxeExists(initAxeClass)
          .then(axe=> {
                if(axe.length==0){
                    initAxeClass.code= req.body.code
                    initAxeClass.libelle= req.body.libelle
                    initAxeClass.description= req.body.description
                    initAxeClass.creationUserId= req.body.creationUserId
                      Axe.addAxeInModel(initAxeClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet axe existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}

//supression logique d'un axe
function disableAxe(req, res, next){
    initAxeClass.id= req.body.id
    initAxeClass.modifUserId= req.body.modifUserId
    initAxeClass.modifDate= req.body.modifDate

    Axe.disableAxeInModel(initAxeClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateAxe(req,res, next){
        
       
    initAxeClass.libelle= req.body.libelle
       
    //verifie si l'utilisateur existe en base
    Axe.checkIfAxeExists(initAxeClass)
         .then(axe=> {
               if((axe.length==0) || (axe[0].id== req.body.id) ){
                   initAxeClass.id= req.body.id
                   initAxeClass.code= req.body.code
                   initAxeClass.libelle= req.body.libelle
                   initAxeClass.description= req.body.description
                   initAxeClass.modifDate= req.body.modifDate
                   initAxeClass.modifUserId= req.body.modifUserId
                   Axe.updateAxeInModel(initAxeClass)
                         .then(()=> res.status(200).json({succes: "la création a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet axe existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

}


function getAsingleAxe(req, res, next){
    const id= req.params.id
    Axe.getAxeByIdInModel(id)
        .then(axe=> res.status(200).json(axe))
        .catch(error=> res.status(400).json(error))
}  


function getAllAxes(req,res, next){
    initAxeClass.estActif= req.body.estActif
    initAxeClass.debut= req.body.debut
    initAxeClass.fin= req.body.fin

     Axe.getAllAxeInModel(initAxeClass)
        .then(axes=> res.status(200).json(axes))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableAxe,
    addAxe,
    updateAxe,
    getAsingleAxe,
    getAllAxes
}