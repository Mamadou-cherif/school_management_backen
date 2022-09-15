const ActiviteService = require("../models/activiteservice")

 
function addActiviteService(req, res,next){
    const objActiviteService={
        activiteId: req.body.activiteId,
        serviceId: req.body.serviceId,
        estActif:1
    }
    ActiviteService.activiteServiceSelectByInModel(objActiviteService)
       .then(activiteservice=>{
            if(activiteservice.length==0){
            const activiteserviceObj={
                    activiteId: req.body.activiteId,
                    serviceId: req.body.serviceId,
                    type: req.body.type,
                    observations: req.body.observations,
                    creationUserId: req.body.creationUserId,
                }
                ActiviteService.addActiviteServiceInModel(activiteserviceObj)
                    .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                    .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
               else {
                    
                  return  res.status(500).json({error: "Cette activite existe déjà pour ce projet"})
                }
        })
      .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))


            }

function activiteserviceSelectBy(req, res, next){
    const activiteserviceObj={
        id: req.body.id || null,
        paabId: req.body.paabId || null,
        activiteId: req.body.activiteId || null,
        serviceId: req.body.serviceId || null,
        type: req.body.type || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}
    ActiviteService.activiteServiceSelectByInModel(activiteserviceObj)
        .then(activiteservice=> res.status(200).json(activiteservice))
        .catch(error=> res.status(400).json(error))

}







 
function updateActiviteService(req,res, next){
    const objActiviteService={
        activiteId: req.body.activiteId,
        serviceId: req.body.serviceId,
        estActif:1
    }
    ActiviteService.activiteServiceSelectByInModel(objActiviteService)
       .then(activiteservice=>{
        if((activiteservice.length==0) || (activiteservice[0].id == req.body.id)){
            const activiteserviceObj={
                id: req.body.id,
                activiteId: req.body.activiteId,
                serviceId: req.body.serviceId,
                type: req.body.type,
                observations: req.body.observations,
                modifDate: req.body.modifDate,
                modifUserId: req.body.modifUserId,
        }
                ActiviteService.updateActiviteServiceInModel(activiteserviceObj)
                    .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                    .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
               
        
       }
           else {
                res.status(500).json({error: "ce service intervient déjà sur cette activité"})
              }
            })
            .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
     }

//supression logique d'un activiteservice
function disableActiviteService(req, res, next) {
 const activiteserviceObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    ActiviteService.disableActiviteServiceInModel(activiteserviceObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleActiviteService(req, res, next) {
    const id = req.params.id
    ActiviteService.getActiviteServiceByIdInModel(id)
        .then(activiteservice => res.status(200).json(activiteservice))
        .catch(error => res.status(400).json(error))
}


function getAllActiviteService(req, res, next) {
    ActiviteService.getAllActiviteServiceInModel()
        .then(activiteservice => res.status(200).json(activiteservice))
        .catch(error => res.status(400).json(error))
    }
module.exports = {
    disableActiviteService,
    addActiviteService,
    updateActiviteService,
    getAsingleActiviteService,
    getAllActiviteService,
    activiteserviceSelectBy,
}