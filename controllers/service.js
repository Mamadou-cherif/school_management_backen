const Service= require("../models/service")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json()) 
const bcrypt= require("bcrypt")
const initServiceClass= require("../classes/service")


function addService(req, res,next){


    
                    
                    initServiceClass.structureId= req.body.structureId 
                    initServiceClass.nom= req.body.nom                   
                    initServiceClass.responsableService= req.body.responsableService                   
                    initServiceClass.telephone= req.body.telephone                   
                    initServiceClass.email= req.body.email                   
                    initServiceClass.observations= req.body.observations                   
                    initServiceClass.creationUserId= req.body.creationUserId

                      Service.addServiceInModel(initServiceClass)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                        }










//supression logique d'un service
function disableService(req, res, next){
    initServiceClass.id= req.body.id
    initServiceClass.modifUserId= req.body.modifUserId
    initServiceClass.modifDate= req.body.modifDate

    Service.disableServiceInModel(initServiceClass)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateService(req,res, next){
        
       
    initServiceClass.nom= req.body.nom
       
    //verifie si l'utilisateur existe en base
    Service.checkIfServiceExists(initServiceClass)
         .then(service=> {
               if(service.length==0){
                initServiceClass.id= req.body.id
                initServiceClass.structureId= req.body.structureId 
                initServiceClass.nom= req.body.nom                   
                initServiceClass.responsableService= req.body.responsableService                   
                initServiceClass.telephone= req.body.telephone                   
                initServiceClass.email= req.body.email                   
                initServiceClass.observations= req.body.observations                   
                initServiceClass.modifDate= req.body.modifDate
                initServiceClass.modifUserId= req.body.modifUserId
          
                   Service.updateServiceInModel(initServiceClass)
                         .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                         .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
               }
               else
                  {
                    res.status(500).json({error: "cet service existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleService(req, res, next){
    const id= req.params.id
    Service.getServiceByIdInModel(id)
        .then(service=> res.status(200).json(service))
        .catch(error=> res.status(400).json(error))
}


function getAllServices(req,res, next){
    

     Service.getAllServiceInModel()
        .then(services=> res.status(200).json(services))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableService,
    addService,
    updateService,
    getAsingleService,
    getAllServices,
}