const CoutExecution = require("../models/coutexecution")

 
function addCoutExecution(req, res,next){
        const coutexecutionObj={
                qtePrevisonnelleId: req.body.qtePrevisonnelleId,
                qteRealisee: req.body.qteRealisee,
                montantRealise: req.body.montantRealise,
                dateOperation: req.body.dateOperation,
                deviseId: req.body.deviseId,
                bailleurId: req.body.bailleurId,
                observations: req.body.observations,
                creationUserId: req.body.creationUserId,
            }
            CoutExecution.addCoutExecutionInModel(coutexecutionObj)
                .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
}

function coutexecutionSelectBy(req, res, next){
    const coutexecutionObj={
        id: req.body.id || null,
        qtePrevisonnelleId: req.body.qtePrevisonnelleId|| null,
        qteRealisee: req.body.qteRealisee|| null,
        montantRealise: req.body.montantRealise|| null,
        dateOperation: req.body.dateOperation || null,
        deviseId: req.body.deviseId|| null,
        bailleurId: req.body.bailleurId|| null,
        observations: req.body.observations|| null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debutDonnees: req.body.debutDonnees || null,
        finDonnees: req.body.finDonnees || null
}


    CoutExecution.coutExecutionSelectByInModel(coutexecutionObj)
        .then(coutexecution=> res.status(200).json(coutexecution))
        .catch(error=> res.status(400).json(error))

}







 
function updateCoutExecution(req,res, next){

            const coutexecutionObj={
                id: req.body.id,
                qtePrevisonnelleId: req.body.qtePrevisonnelleId,
                qteRealisee: req.body.qteRealisee,
                montantRealise: req.body.montantRealise,
                dateOperation: req.body.dateOperation,
                deviseId: req.body.deviseId,
                bailleurId: req.body.bailleurId,
                observations: req.body.observations,
                modifDate: req.body.modifDate,
                modifUserId: req.body.modifUserId,
            }
                CoutExecution.updateCoutExecutionInModel(coutexecutionObj)
                    .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                    .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
               
        }

//supression logique d'une coutexecution
function disableCoutExecution(req, res, next) {
 const coutexecutionObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    CoutExecution.disableCoutExecutionInModel(coutexecutionObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function deleteCoutExecution(req, res, next) {
    const id = req.params.id
    CoutExecution.deleteCoutExecutionInModel(id)
        .then(() => res.status(200).json({succes: "suppression bien réussie"}))
        .catch(error => res.status(400).json(error))
}


function getAsingleCoutExecution(req, res, next) {
    const id = req.params.id
    CoutExecution.getCoutExecutionByIdInModel(id)
        .then(coutexecution => res.status(200).json(coutexecution))
        .catch(error => res.status(400).json(error))
}

function getLineInCoutExecutionByStrategieIdAndPapbId(req, res, next) {
    const obj={
        strategieId: req.body.strategieId,
        papbId: req.body.papbId
    }
    CoutExecution.getLineInCoutExecutionByStrategieIdAndPapbId(obj)
        .then(coutexecution => res.status(200).json(coutexecution))
        .catch(error => res.status(400).json(error))
}

function getLineInCoutExeCutionByQtePrevisionnelle(req, res, next) {
    const obj={
        qtePrevisionnelId: req.body.qtePrevisionnelId
    }
    CoutExecution.getLineInCoutExeCutionByQtePrevisionnelleInModel(obj)
        .then(coutexecution => res.status(200).json(coutexecution))
        .catch(error => res.status(400).json(error))
}


function getAllCoutExecution(req, res, next) {
    CoutExecution.getAllCoutExecutionInModel()
        .then(coutexecution => res.status(200).json(coutexecution))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableCoutExecution,
    getLineInCoutExecutionByStrategieIdAndPapbId,
    getLineInCoutExeCutionByQtePrevisionnelle,
    addCoutExecution,
    updateCoutExecution,
    getAsingleCoutExecution,
    getAllCoutExecution,
    deleteCoutExecution,
    coutexecutionSelectBy
}