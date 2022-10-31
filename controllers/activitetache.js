const ActiviteTache = require("../models/activitetache")

 
function addActiviteTache(req, res,next){
    const activitetacheObj={
        activiteId: req.body.activiteId,
        tacheId: req.body.tacheId,
        estActif: 1
    }
     
    ActiviteTache.activitetacheSelectByInModel(activitetacheObj)
        .then(activitetache=>{
            
            if(activitetache.length==0){
                const activitetacheObj={
                    activiteId: req.body.activiteId,
                    tacheId: req.body.tacheId,
                    niveauExecution: req.body.niveauExecution,
                    tauxExecution: req.body.tauxExecution,
                    responsableId: req.body.responsableId,
                    problemesRencontrees: req.body.problemesRencontrees,
                    solutions: req.body.solutions, 
                    creationUserId: req.body.creationUserId,
            }
                    ActiviteTache.addActiviteTacheInModel(activitetacheObj)
                        .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                        .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
            
            }
            else{
                return res.status(500).json({error: "Dupplicata de cette tache sur cette activité"})
            }
        })
        .catch(()=> res.status(400).json({error: "erreur de la procedure selectBy"}))
   
}



function activitetacheSelectBy(req, res, next){
    const activitetacheObj={
        id: req.body.id || null,
        activiteId: req.body.activiteId || null,
        tacheId: req.body.tacheId || null,
        niveauExecution: req.body.niveauExecution || null,
        tauxExecution: req.body.tauxExecution || null,
        responsableId: req.body.responsableId || null,
        problemesRencontrees: req.body.problemesRencontrees,
        solutions: req.body.solutions || null, 
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
    }

    ActiviteTache.activitetacheSelectByInModel(activitetacheObj)
        .then(activitetache=> res.status(200).json(activitetache))
        .catch(error=> res.status(400).json(error))
}







 
function updateActiviteTache(req,res, next){
    const activitetacheObj={
        activiteId: req.body.activiteId,
        tacheId: req.body.tacheId,
        estActif: 1
    }
     
    ActiviteTache.activitetacheSelectByInModel(activitetacheObj)
        .then(activitetache=>{
            if((activitetache.length==0) || (activitetache[0].id == req.body.id)){
                const activitetacheObj={
                    id: req.body.id,
                    activiteId: req.body.activiteId,
                    tacheId: req.body.tacheId,
                    niveauExecution: req.body.niveauExecution,
                    tauxExecution: req.body.tauxExecution,
                    responsableId: req.body.responsableId,
                    problemesRencontrees: req.body.problemesRencontrees,
                    solutions: req.body.solutions, 
                    modifDate: req.body.modifDate,
                    modifUserId: req.body.modifUserId,
            }
            ActiviteTache.updateActiviteTacheInModel(activitetacheObj)
                .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
            
            }
            else{
                return res.status(500).json({error: "Dupplicata de cette tache sur cette activité"})
            }
        })
        .catch(()=> res.status(400).json({error: "erreur de la procedure selectBy"}))
    
}

//supression logique d'un activitetache
function disableActiviteTache(req, res, next) {
 const activitetacheObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    ActiviteTache.disableActiviteTacheInModel(activitetacheObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleActiviteTache(req, res, next) {
    const id = req.params.id
    ActiviteTache.getActiviteTacheByIdInModel(id)
        .then(activitetache => res.status(200).json(activitetache))
        .catch(error => res.status(400).json(error))
}


function getAllActiviteTache(req, res, next) {
    ActiviteTache.getAllActiviteTacheInModel()
        .then(activitetache => res.status(200).json(activitetache))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableActiviteTache,
    addActiviteTache,
    updateActiviteTache,
    getAsingleActiviteTache,
    getAllActiviteTache,
    activitetacheSelectBy
}