const ServiceConcerne= require("../models/serviceconcerne")
const express= require("express") 
const initServiceConcerneClass= require("../classes/serviceconcerne")


function addServiceConcerne(req, res,next){
    const serviceConcerneObj={
        projetId: req.body.projetId || null,
        serviceId: req.body.serviceId || null,
       
        estActif: 1,
      
} 
    ServiceConcerne.serviceConcerneSelectByInModel(serviceConcerneObj)
    .then(serviceconcerne=>{
        if(serviceconcerne.length==0){
        const serviceConcerneObj={
            id: req.body.id || null,
            projetId: req.body.projetId || null,
            serviceId: req.body.serviceId || null,
            observations: req.body.observations || null,
            estActif: 1,
            creationDate: req.body.creationDate || null,
            creationUserId: req.body.creationUserId || null,
            modifDate: req.body.modifDate || null,
            modifUserId: req.body.modifUserId || null,
            debut: req.body.debut || null,
            fin: req.body.fin || null
    } 
        ServiceConcerne.addServiceConcerneInModel(serviceConcerneObj)
            .then(()=> res.status(201).json({succes: "la création a reussi"}))
            .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
    }
    else{
        res.status(400).json({error: "dupplicata du service concerné!"})
    }
    })
    .catch(error=> res.status(400).json(error))
}









//supression logique d'un serviceconcerne
function disableServiceConcerne(req, res, next){
    const serviceConcerneObj={
        id: req.body.id || null,
		projetId: req.body.projetId || null,
		serviceId: req.body.serviceId || null,
		observations: req.body.observations || null,
		estActif: 1,
		creationDate: req.body.creationDate || null,
		creationUserId: req.body.creationUserId || null,
		modifDate: req.body.modifDate || null,
		modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}

    ServiceConcerne.disableServiceConcerneInModel(serviceConcerneObj)
    .then(()=> res.status(200).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateServiceConcerne(req,res, next){
    const serviceConcerneObj={
        projetId: req.body.projetId || null,
        serviceId: req.body.serviceId || null,
       
        estActif: 1,
      
    } 
    ServiceConcerne.serviceConcerneSelectByInModel(serviceConcerneObj)
    .then(serviceconcerne=>{ 
        if((serviceconcerne.length==0) || (serviceconcerne[0].id== req.body.id)){
        const serviceConcerneObj={
            id: req.body.id || null,
            projetId: req.body.projetId || null,
            serviceId: req.body.serviceId || null,
            observations: req.body.observations || null,
            estActif: 1,
            creationDate: req.body.creationDate || null,
            creationUserId: req.body.creationUserId || null,
            modifDate: req.body.modifDate || null,
            modifUserId: req.body.modifUserId || null,
            debut: req.body.debut || null,
            fin: req.body.fin || null
    } 
    ServiceConcerne.updateServiceConcerneInModel(serviceConcerneObj)
    .then(()=> res.status(200).json({succes: "la modification a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
    
    
    }
    else{
        res.status(400).json({error: "dupplicata du service concerné!"})
    }
    })
    .catch(error=> res.status(400).json(error))
         

}
function serviceConcerneSelectBy(req, res,next){
    const serviceConcerne={
        id: req.body.id || null,
		projetId: req.body.projetId || null,
		serviceId: req.body.serviceId || null,
		observations: req.body.observations || null,
		estActif: 1,
		creationDate: req.body.creationDate || null,
		creationUserId: req.body.creationUserId || null,
		modifDate: req.body.modifDate || null,
		modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}
    ServiceConcerne.serviceConcerneSelectByInModel(serviceConcerne)
    .then(serviceconcerne=> res.status(200).json(serviceconcerne))
    .catch(error=> res.status(400).json(error))
}

function getAsingleServiceConcerne(req, res, next){
    const id= req.params.id
    ServiceConcerne.getServiceConcerneByIdInModel(id)
        .then(serviceconcerne=> res.status(200).json(serviceconcerne))
        .catch(error=> res.status(400).json(error))
}


function getAllServiceConcernes(req,res, next){
    res.status(200).json({succes: "cette function ne marche pas"})
}





 
module.exports={
    disableServiceConcerne,
    addServiceConcerne,
    updateServiceConcerne,
    getAsingleServiceConcerne,
    getAllServiceConcernes,
    serviceConcerneSelectBy
}