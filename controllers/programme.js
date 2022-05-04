const Programme= require("../models/programme")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initProgrammeClass= require("../classes/programme")


function addProgramme(req, res,next){

    initProgrammeClass.libelle= req.body.libelle
       
     //verifie si l'utilisateur existe en base
     Programme.checkIfProgrammeExists(initProgrammeClass)
          .then(programme=> {
                if(programme.length==0){
                    initProgrammeClass.axeId= req.body.axeId
                    initProgrammeClass.code= req.body.code
                    initProgrammeClass.libelle= req.body.libelle
                    initProgrammeClass.description= req.body.description
                    initProgrammeClass.creationUserId= req.body.creationUserId
                      Programme.addProgrammeInModel(initProgrammeClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet programme existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}










//supression logique d'un programme
function disableProgramme(req, res, next){
    initProgrammeClass.id= req.body.id
    initProgrammeClass.modifUserId= req.body.modifUserId
    initProgrammeClass.modifDate= req.body.modifDate

    Programme.disableProgrammeInModel(initProgrammeClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké de suppression"}));
}
 
function updateProgramme(req,res, next){
        
       
    initProgrammeClass.libelle= req.body.libelle
       
    //verifie si l'utilisateur existe en base
    Programme.checkIfProgrammeExists(initProgrammeClass)
         .then(programme=> {
               if(programme.length==0){
                   initProgrammeClass.id= req.body.id
                   initProgrammeClass.axeId= req.body.axeId
                   initProgrammeClass.code = req.body.code 
                   initProgrammeClass.libelle= req.body.libelle
                   initProgrammeClass.description= req.body.description
                   initProgrammeClass.modifDate= req.body.modifDate
                   initProgrammeClass.modifUserId= req.body.modifUserId
                   Programme.updateProgrammeInModel(initProgrammeClass)
                         .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet programme existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleProgramme(req, res, next){
    const id= req.params.id
    Programme.getProgrammeByIdInModel(id)
        .then(programme=> res.status(200).json(programme))
        .catch(error=> res.status(400).json(error))
}


function getAllProgrammes(req,res, next){
    initProgrammeClass.estActif= req.body.estActif
    initProgrammeClass.debut= req.body.debut
    initProgrammeClass.fin= req.body.fin

     Programme.getAllProgrammeInModel(initProgrammeClass)
        .then(programmes=> res.status(200).json(programmes))
        .catch(error=> res.status(400).json(error))
}





 
function checkIfProgrammeExists(req, res, next){
    initProgrammeClass.id= req.body.id
    Programme.checkIfProgrammeExists(initProgrammeClass)
        .then(programme=> res.status(200).json(programme))
        .catch(error=> res.status(400).json(error))
}

module.exports={
    checkIfProgrammeExists,
    disableProgramme,
    addProgramme,
    updateProgramme,
    getAsingleProgramme,
    getAllProgrammes,
}