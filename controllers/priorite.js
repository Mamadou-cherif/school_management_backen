const Priorite= require("../models/priorite")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initPrioriteClass= require("../classes/priorite")


function addPriorite(req, res,next){
    const prioriteObj={
		libelle: req.body.libelle,
		estActif: 1
    }
    
       
     //verifie si l'utilisateur existe en base
     Priorite.checkIfPrioriteExists(prioriteObj)
          .then(priorite=> {
                if(priorite.length==0){
                    const prioriteObj={
                        code: req.body.code,
                        estActif: 1 
                }
                    Priorite.checkIfPrioriteExists(prioriteObj)
                        .then(priorite=>{
                            if(priorite.length==0){
                                initPrioriteClass.libelle= req.body.libelle
                                initPrioriteClass.code= req.body.code                   
                                initPrioriteClass.creationUserId= req.body.creationUserId
            
                                  Priorite.addPrioriteInModel(initPrioriteClass)
                                      .then(()=> res.status(201).json({succes: "la création a reussi"}))
                                      .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                            
                            }
                            else{
                                return res.status(400).json({error: "duplicata du code de la priorité"})
                            }
                        }) 
                        .catch()
             }
            else
            {
                res.status(500).json({error: "Dupplicata du libellé de la priorité"})
            }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}










//supression logique d'un priorite
function disablePriorite(req, res, next) {
    initPrioriteClass.id = req.body.id
    initPrioriteClass.modifUserId = req.body.modifUserId
    initPrioriteClass.modifDate = req.body.modifDate

    Priorite.disablePrioriteInModel(initPrioriteClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
}
 
function updatePriorite(req,res, next){
        
    const prioriteObj={
		libelle: req.body.libelle,
		estActif: 1,	
    }

    Priorite.checkIfPrioriteExists(prioriteObj)
         .then(priorite=> {
               if((priorite.length==0) || (priorite[0].id== req.body.id) ){
                const prioriteObj={
                    code: req.body.code,
                    estActif: 1,	
                }
                    Priorite.checkIfPrioriteExists(prioriteObj)
                    .then(priorite=>{
                        if((priorite.length==0) || (priorite[0].id== req.body.id) ){
                            initPrioriteClass.id= req.body.id
                            initPrioriteClass.libelle= req.body.libelle
                            initPrioriteClass.code= req.body.code                   
                            initPrioriteClass.modifDate= req.body.modifDate
                            initPrioriteClass.modifUserId= req.body.modifUserId
    
                            Priorite.updatePrioriteInModel(initPrioriteClass)
                            .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                
                        }
                        else
                        {
                            res.status(500).json({error: "Dupplicata du code saisi"})
                        }
                    })
                    
                }
               else
                  {
                    res.status(500).json({error: "Cette priorité existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsinglePriorite(req, res, next) {
    const id = req.params.id
    Priorite.getPrioriteByIdInModel(id)
        .then(priorite => res.status(200).json(priorite))
        .catch(error => res.status(400).json(error))
}


function getAllPriorites(req, res, next) {
    initPrioriteClass.estActif = req.body.estActif
    initPrioriteClass.debut = req.body.debut
    initPrioriteClass.fin = req.body.fin

    Priorite.getAllPrioriteInModel(initPrioriteClass)
        .then(priorites => res.status(200).json(priorites))
        .catch(error => res.status(400).json(error))
}






module.exports = {
    disablePriorite,
    addPriorite,
    updatePriorite,
    getAsinglePriorite,
    getAllPriorites,
}