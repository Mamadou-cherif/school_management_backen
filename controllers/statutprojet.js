const StatutProjet= require("../models/statutprojet")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initStatutProjetClass= require("../classes/statutprojet")


function addStatutProjet(req, res,next){
    const statutprojet={
        id: null,
        libelle: null,
        code: null,
        estActif: 1,
        creationDate: null,
        creationUserId: null,
        modifDate: null,
        modifUserId: null,
        debut: null,
        fin: null
    
    }
       
     //verifie si l'utilisateur existe en base
     StatutProjet.checkIfStatutProjetExists(statutprojet)
          .then(statutprojet=> {
                if(statutprojet.length==0){
                    initStatutProjetClass.libelle= req.body.libelle
                    initStatutProjetClass.libelle= req.body.libelle
                    initStatutProjetClass.code= req.body.code                   
                    initStatutProjetClass.creationUserId= req.body.creationUserId

                      StatutProjet.addStatutProjetInModel(initStatutProjetClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet statutprojet existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}










//supression logique d'un statutprojet
function disableStatutProjet(req, res, next){
    initStatutProjetClass.id= req.body.id
    initStatutProjetClass.modifUserId= req.body.modifUserId
    initStatutProjetClass.modifDate= req.body.modifDate

    StatutProjet.disableStatutProjetInModel(initStatutProjetClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateStatutProjet(req,res, next){
    const statutprojetObj={
        id: null,
        libelle: req.body.libelle,
        code: null,
        estActif: 1,
        creationDate: null,
        creationUserId: null,
        modifDate: null,
        modifUserId: null,
        debut: null,
        fin: null
    
    }
              
    //verifie si l'utilisateur existe en base
    StatutProjet.checkIfStatutProjetExists(statutprojetObj)
         .then(statutprojet=> {
               if(statutprojet.length==0){
                initStatutProjetClass.libelle= req.body.libelle
                initStatutProjetClass.id= req.body.id
                initStatutProjetClass.libelle= req.body.libelle
                initStatutProjetClass.code= req.body.code                   
                initStatutProjetClass.modifDate= req.body.modifDate
                initStatutProjetClass.modifUserId= req.body.modifUserId
          
                   StatutProjet.updateStatutProjetInModel(initStatutProjetClass)
                         .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet statutprojet existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleStatutProjet(req, res, next){
    const id= req.params.id
    StatutProjet.getStatutProjetByIdInModel(id)
        .then(statutprojet=> res.status(200).json(statutprojet))
        .catch(error=> res.status(400).json(error))
}


function getAllStatutProjets(req,res, next){
    initStatutProjetClass.estActif= req.body.estActif
    initStatutProjetClass.debut= req.body.debut
    initStatutProjetClass.fin= req.body.fin

     StatutProjet.getAllStatutProjetInModel(initStatutProjetClass)
        .then(statutprojets=> res.status(200).json(statutprojets))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableStatutProjet,
    addStatutProjet,
    updateStatutProjet,
    getAsingleStatutProjet,
    getAllStatutProjets,
}