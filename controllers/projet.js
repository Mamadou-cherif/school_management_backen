const Projet= require("../models/projet")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initProjetClass= require("../classes/projet")


function addProjet(req, res,next){

    initProjetClass.libelle= req.body.libelle
       
     //verifie si l'utilisateur existe en base
     Projet.checkIfProjetExists(initProjetClass)
          .then(projet=> {
                if(projet.length==0){
                    initProjetClass.programmeId= req.body.programmeId
                    initProjetClass.titre= req.body.titre
                    initProjetClass.code = req.body.code 
                    initProjetClass.description= req.body.description
                    initProjetClass.prioriteId= req.body.prioriteId
                    initProjetClass.nature= req.body.nature
                    initProjetClass.modalites= req.body.modalites
                    initProjetClass.duree= req.body.duree
                    initProjetClass.debut= req.body.debut 
                    initProjetClass.fin= req.body.fin
                    initProjetClass.statutId= req.body.statutId 
                    initProjetClass.observations= req.body.observations
                    initProjetClass.creationUserId= req.body.creationUserId
                      Projet.addProjetInModel(initProjetClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet projet existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}










//supression logique d'un projet
function disableProjet(req, res, next){
    initProjetClass.id= req.body.id
    initProjetClass.modifUserId= req.body.modifUserId
    initProjetClass.modifDate= req.body.modifDate

    Projet.disableProjetInModel(initProjetClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateProjet(req,res, next){

    initProjetClass.id= req.body.id
    initProjetClass.titre= req.body.titre
    initProjetClass.programmeId= req.body.programmeId
    initProjetClass.code = req.body.code 
    initProjetClass.description= req.body.description
    initProjetClass.prioriteId= req.body.prioriteId
    initProjetClass.nature= req.body.nature
    initProjetClass.modalites= req.body.modalites
    initProjetClass.duree= req.body.duree
    initProjetClass.debut= req.body.debut
    initProjetClass.fin= req.body.fin
    initProjetClass.statutId= req.body.statutId 
    initProjetClass.observations= req.body.observations
    initProjetClass.modifDate= req.body.modifDate
    initProjetClass.modifUserId= req.body.modifUserId
        Projet.updateProjetInModel(initProjetClass)
                .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
    
        
   
                   
                     
         

}

function getAsingleProjet(req, res, next){
    const id= req.params.id
    Projet.getProjetByIdInModel(id)
        .then(projet=> res.status(200).json(projet))
        .catch(error=> res.status(400).json(error))
}


function getAllProjets(req,res, next){
    initProjetClass.estActif= req.body.estActif
    initProjetClass.debut= req.body.debut
    initProjetClass.fin= req.body.fin

     Projet.getAllProjetInModel(initProjetClass)
        .then(projets=> res.status(200).json(projets))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableProjet,
    addProjet,
    updateProjet,
    getAsingleProjet,
    getAllProjets,
}