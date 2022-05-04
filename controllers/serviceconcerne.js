const ServiceConcerne= require("../models/serviceconcerne")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initServiceConcerneClass= require("../classes/serviceconcerne")


function addServiceConcerne(req, res,next){

    initServiceConcerneClass.libelle= req.body.libelle
       
     //verifie si l'utilisateur existe en base
     ServiceConcerne.checkIfServiceConcerneExists(initServiceConcerneClass)
          .then(serviceconcerne=> {
                if(serviceconcerne.length==0){
                    
                    initServiceConcerneClass.projetId= req.body.projetId 
                    initServiceConcerneClass.serviceId= req.body.serviceId                   
                    initServiceConcerneClass.observations= req.body.observations                   
                    initServiceConcerneClass.creationUserId= req.body.creationUserId

                      ServiceConcerne.addServiceConcerneInModel(initServiceConcerneClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "cet serviceconcerne existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}










//supression logique d'un serviceconcerne
function disableServiceConcerne(req, res, next){
    initServiceConcerneClass.id= req.body.id
    initServiceConcerneClass.modifUserId= req.body.modifUserId
    initServiceConcerneClass.modifDate= req.body.modifDate

    ServiceConcerne.disableServiceConcerneInModel(initServiceConcerneClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateServiceConcerne(req,res, next){
        
       
    initServiceConcerneClass.libelle= req.body.libelle
       
    //verifie si l'utilisateur existe en base
    ServiceConcerne.checkIfServiceConcerneExists(initServiceConcerneClass)
         .then(serviceconcerne=> {
               if(serviceconcerne.length==0){
                initServiceConcerneClass.projetId= req.body.projetId 
                initServiceConcerneClass.serviceId= req.body.serviceId                   
                initServiceConcerneClass.observations= req.body.observations                
                initServiceConcerneClass.modifDate= req.body.modifDate
                initServiceConcerneClass.modifUserId= req.body.modifUserId
          
                   ServiceConcerne.updateServiceConcerneInModel(initServiceConcerneClass)
                         .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet serviceconcerne existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleServiceConcerne(req, res, next){
    const id= req.params.id
    ServiceConcerne.getServiceConcerneByIdInModel(id)
        .then(serviceconcerne=> res.status(200).json(serviceconcerne))
        .catch(error=> res.status(400).json(error))
}


function getAllServiceConcernes(req,res, next){
    initServiceConcerneClass.estActif= req.body.estActif
    initServiceConcerneClass.debut= req.body.debut
    initServiceConcerneClass.fin= req.body.fin

     ServiceConcerne.getAllServiceConcerneInModel(initServiceConcerneClass)
        .then(serviceconcernes=> res.status(200).json(serviceconcernes))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableServiceConcerne,
    addServiceConcerne,
    updateServiceConcerne,
    getAsingleServiceConcerne,
    getAllServiceConcernes,
}