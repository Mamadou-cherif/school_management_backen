const QtePrevisionnelle = require("../models/qteprevisionnelle")

 
function addQtePrevisionnelle(req, res,next){

    const qteprevisionnelleObj={
        activiteId: req.body.activiteId,
        papbId: req.body.papbId,
        paabId: req.body.paabId,
        qtePrevisionnelle: req.body.qtePrevisionnelle,
        montantPrevisionnel: req.body.montantPrevisionnel,
        deviseId: req.body.deviseId,
        observations: req.body.observations,
        creationUserId: req.body.creationUserId,
        
    }
    
        QtePrevisionnelle.addQtePrevisionnelleInModel(qteprevisionnelleObj)
            .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
}



function qteprevisionnelleSelectBy(req, res, next){
    const qteprevisionnelleObj={
        id: req.body.id || null,
        activiteId: req.body.activiteId || null,
        papbId: req.body.papbId || null,
        paabId: req.body.paabId|| null,
        qtePrevisionnelle: req.body.qtePrevisionnelle|| null,
        montantPrevisionnel: req.body.montantPrevisionnel|| null,
        deviseId: req.body.deviseId|| null,
        observations: req.body.observations,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}
QtePrevisionnelle.qteprevisionnelleSelectByInModel(qteprevisionnelleObj)
    .then(qteprevisionnelle=> res.status(200).json(qteprevisionnelle))
    .catch(error=> res.status(400).json(error))

}







 
function updateQtePrevisionnelle(req,res, next){

const qteprevisionnelleObj={
        id: req.body.id,
        activiteId: req.body.activiteId,
        papbId: req.body.papbId,
        paabId: req.body.paabId,
        qtePrevisionnelle: req.body.qtePrevisionnelle,
        montantPrevisionnel: req.body.montantPrevisionnel,
        deviseId: req.body.deviseId,
        observations: req.body.observations,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
    }
    
        QtePrevisionnelle.updateQtePrevisionnelleInModel(qteprevisionnelleObj)
            .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
    
    }

//supression logique d'une qteprevisionnelle
function disableQtePrevisionnelle(req, res, next) {
 const qteprevisionnelleObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    QtePrevisionnelle.disableQtePrevisionnelleInModel(qteprevisionnelleObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function deleteQtePrevisionnelle(req, res, next) {
    const id = req.params.id
    QtePrevisionnelle.deleteQtePrevisionnelleInModel(id)
        .then(() => res.status(200).json({succes: "suppression bien réussie"}))
        .catch(error => res.status(400).json(error))
}


function getAsingleQtePrevisionnelle(req, res, next) {
    const id = req.params.id
    QtePrevisionnelle.getQtePrevisionnelleByIdInModel(id)
        .then(qteprevisionnelle => res.status(200).json(qteprevisionnelle))
        .catch(error => res.status(400).json(error))
}


function getAllQtePrevisionnelle(req, res, next) {
    QtePrevisionnelle.getAllQtePrevisionnelleInModel()
        .then(qteprevisionnelle => res.status(200).json(qteprevisionnelle))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableQtePrevisionnelle,
    addQtePrevisionnelle,
    updateQtePrevisionnelle,
    getAsingleQtePrevisionnelle,
    getAllQtePrevisionnelle,
    deleteQtePrevisionnelle,
    qteprevisionnelleSelectBy
}