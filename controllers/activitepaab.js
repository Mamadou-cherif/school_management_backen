const ActivitePaab = require("../models/activitepaab")

 
function addActivitePaab(req, res,next){
        const activitepaabObj={
                paabId: req.body.paabId,
                activiteId: req.body.activiteId,
                quantite: req.body.quantite,
                coutUnitaire: req.body.coutUnitaire,
                debut: req.body.debut,
                fin: req.body.fin,
                observations: req.body.observations,
                creationUserId: req.body.creationUserId,
            }
            ActivitePaab.addActivitePaabInModel(activitepaabObj)
                .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
}



function activitepaabSelectBy(req, res, next){
    const activitepaabObj={
        id: req.body.id || null,
        paabId: req.body.paabId || null,
        activiteId: req.body.activiteId || null,
        quantite: req.body.quantite || null,
        coutUnitaire: req.body.coutUnitaire || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}
    ActivitePaab.activitePaabSelectByInModel(activitepaabObj)
        .then(activitepaab=> res.status(200).json(activitepaab))
        .catch(error=> res.status(400).json(error))

}







 
function updateActivitePaab(req,res, next){
    const activitepaabObj={
        id: req.body.id,
        paabId: req.body.paabId,
        activiteId: req.body.activiteId,
        quantite: req.body.quantite,
        coutUnitaire: req.body.coutUnitaire,
        debut: req.body.debut,
        fin: req.body.fin,
        observations: req.body.observations,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}

        ActivitePaab.updateActivitePaabInModel(activitepaabObj)
            .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                
                
        
        }

//supression logique d'un activitepaab
function disableActivitePaab(req, res, next) {
 const activitepaabObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    ActivitePaab.disableActivitePaabInModel(activitepaabObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleActivitePaab(req, res, next) {
    const id = req.params.id
    ActivitePaab.getActivitePaabByIdInModel(id)
        .then(activitepaab => res.status(200).json(activitepaab))
        .catch(error => res.status(400).json(error))
}


function getAllActivitePaab(req, res, next) {
    ActivitePaab.getAllActivitePaabInModel()
        .then(activitepaab => res.status(200).json(activitepaab))
        .catch(error => res.status(400).json(error))
    }

    function activite_getParams(req, res, next){
       const activitepaabObj={
        paabId: req.body.paabId || null,
        papbId: req.body.papbId || null
       }
        ActivitePaab.activite_getParams(activitepaabObj)
        .then(activitepaab => res.status(200).json(activitepaab))
        .catch(error => res.status(400).json(error))
    }


module.exports = {
    activite_getParams,
    disableActivitePaab,
    addActivitePaab,
    updateActivitePaab,
    getAsingleActivitePaab,
    getAllActivitePaab,
    activitepaabSelectBy,
}