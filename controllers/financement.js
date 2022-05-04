const Financement= require("../models/financement")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initFinancementClass= require("../classes/financement")


function addFinancement(req, res,next){

    initFinancementClass.libelle= req.body.libelle
       
     //verifie si l'utilisateur existe en base
     Financement.checkIfFinancementExists(initFinancementClass)
          .then(financement=> {
                if(financement.length==0){
                    
                    initFinancementClass.projetId= req.body.projetId
                    initFinancementClass.structureId= req.body.structureId                   
                    initFinancementClass.type= req.body.type                   
                    initFinancementClass.typeAppui= req.body.typeAppui                   
                    initFinancementClass.taux= req.body.taux                   
                    initFinancementClass.observations= req.body.observations                   
                    initFinancementClass.creationUserId= req.body.creationUserId

                      Financement.addFinancementInModel(initFinancementClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet financement existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}










//supression logique d'un financement
function disableFinancement(req, res, next){
    initFinancementClass.id= req.body.id
    initFinancementClass.modifUserId= req.body.modifUserId
    initFinancementClass.modifDate= req.body.modifDate

    Financement.disableFinancementInModel(initFinancementClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateFinancement(req,res, next){
        
       
    initFinancementClass.libelle= req.body.libelle
       
    //verifie si l'utilisateur existe en base
    Financement.checkIfFinancementExists(initFinancementClass)
         .then(financement=> {
               if(financement.length==0){

                initFinancementClass.id= req.body.id
                initFinancementClass.projetId= req.body.projetId
                initFinancementClass.structureId= req.body.structureId                   
                initFinancementClass.type= req.body.type                   
                initFinancementClass.typeAppui= req.body.typeAppui                   
                initFinancementClass.taux= req.body.taux                   
                initFinancementClass.observations= req.body.observations                   
                initFinancementClass.modifDate= req.body.modifDate
                initFinancementClass.modifUserId= req.body.modifUserId
          
                   Financement.updateFinancementInModel(initFinancementClass)
                         .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet financement existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleFinancement(req, res, next){
    const id= req.params.id
    Financement.getFinancementByIdInModel(id)
        .then(financement=> res.status(200).json(financement))
        .catch(error=> res.status(400).json(error))
}


function getAllFinancements(req,res, next){
    initFinancementClass.estActif= req.body.estActif
    initFinancementClass.estActif= req.body.debut
    initFinancementClass.estActif= req.body.fin

     Financement.getAllFinancementInModel(initFinancementClass)
        .then(financements=> res.status(200).json(financements))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableFinancement,
    addFinancement,
    updateFinancement,
    getAsingleFinancement,
    getAllFinancements,
}