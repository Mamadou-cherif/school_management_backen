const Financement= require("../models/financement")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initFinancementClass= require("../classes/financement")


function addFinancement(req, res,next){
    const financementObj={
        structureId:  req.body.structureId || null,
        estActif: 1
    }   
    Financement.financementSelectByInModel(financementObj)
        .then(financement=>{
            if(financement.length==0){
                const financementObj={
                    id: req.body.id || null,
                    projetId:  req.body.projetId || null,
                    structureId:  req.body.structureId || null,
                    type:  req.body.type || null,
                    typeAppui:  req.body.typeAppui || null,
                    taux:  req.body.taux || null,
                    observations:  req.body.observations || null,
                    estActif: 1,
                    creationDate:  req.body.creationDate || null,
                    creationUserId:  req.body.creationUserId || null,
                    modifDate:  req.body.modifDate || null,
                    modifUserId:  req.body.modifUserId || null,
                    debut:  req.body.debut || null,
                    fin:  req.body.fin || null
               
               }
                Financement.addFinancementInModel(financementObj)
                .then(()=> res.status(200).json({succes: "la création a reussi"}))
                .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
            }
            else{
                res.status(400).json({succes: "dupplicata de la structure"})
            }
            
    
        })
        .catch(error=> res.status(400).json(error))
     
}










//supression logique d'un financement
function disableFinancement(req, res, next){
    const financementObj={
        id: req.body.id,
        modifDate:  req.body.modifDate,
        modifUserId:  req.body.modifUserId,
   }

    Financement.disableFinancementInModel(financementObj)
    .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateFinancement(req,res, next){     
    const financementObj={
        structureId:  req.body.structureId || null,
        estActif: 1,
   }
   Financement.financementSelectByInModel(financementObj)
   .then(financement=>{
       if((financement.length==0)  ||  (financement[0].id == req.body.id)){
           const financementObj={
               id: req.body.id || null,
               projetId:  req.body.projetId || null,
               structureId:  req.body.structureId || null, 
               type:  req.body.type || null,
               typeAppui:  req.body.typeAppui || null,
               taux:  req.body.taux || null,
               observations:  req.body.observations || null,
               estActif: 1,
               creationDate:  req.body.creationDate || null,
               creationUserId:  req.body.creationUserId || null,
               modifDate:  req.body.modifDate || null,
               modifUserId:  req.body.modifUserId || null,
               debut:  req.body.debut || null,
               fin:  req.body.fin || null
          
          }
          Financement.updateFinancementInModel(financementObj)
          .then(()=> res.status(200).json({succes: "la modification a reussi"}))
          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));         
}
       else{
           res.status(400).json({succes: "dupplicata de la structure"})
       }
       

   })
   .catch(error=> res.status(400).json(error))

     
}

function financementSelectBy(req, res, next){
    const financement={
        id: req.body.id || null,
        projetId: req.body.projetId || null,
        structureId: req.body.structureId || null,
        type: req.body.type || null,
        typeAppui: req.body.typeAppui || null,
        taux: req.body.taux || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
   
   }
    Financement.financementSelectByInModel(financement)
        .then(financement=> res.status(200).json(financement))
        .catch(error=> res.status(400).json(error))
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
    financementSelectBy
}