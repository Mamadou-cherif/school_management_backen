const Strategie = require("../models/strategie")

 
function addStrategie(req, res,next){
    const objStrategie={
        resultatId: req.body.resultatId,
        libelle: req.body.libelle,
        estActif:1
    }
     Strategie.strategieSelectByInModel(objStrategie)
          .then(strategie=> {
                if(strategie.length==0){
                    const strategieObj={
                        resultatId: req.body.resultatId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      Strategie.addStrategieInModel(strategieObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette strategie existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}

function selectStatsPapbStrategie(req, res, next) {
    
    Strategie.selectStatsPapbStrategieInModel()

        .then(activite=> res.status(200).json(activite))
        .catch(error=> res.status(400).json(error))
}

function strategieSelectBy(req, res, next){
    const strategieObj={
        id: req.body.id || null,
        resultatId: req.body.resultatId || null,
        numero: req.body.numero || null,
        libelle: req.body.libelle || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    Strategie.strategieSelectByInModel(strategieObj)
        .then(strategie=> res.status(200).json(strategie))
        .catch(error=> res.status(400).json(error))

}







 
function updateStrategie(req,res, next){
        
    const objStrategie={
        resultatId: req.body.resultatId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Strategie.strategieSelectByInModel(objStrategie)
          .then(strategie=> {
                if((strategie.length==0) || (strategie[0].id == req.body.id)){
                    
                    const strategieObj={
                        id: req.body.id,
                        resultatId: req.body.resultatId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Strategie.updateStrategieInModel(strategieObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette strategie existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un strategie
function disableStrategie(req, res, next) {
 const strategieObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Strategie.disableStrategieInModel(strategieObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}


function strategies_getByParams(req, res, next) {
    const id = req.params.id
    Strategie.strategies_getByParams(id)
        .then(strategie => res.status(200).json(strategie))
        .catch(error => res.status(400).json(error))
}

function getAsingleStrategie(req, res, next) {
    const id = req.params.id
    Strategie.getStrategieByIdInModel(id)
        .then(strategie => res.status(200).json(strategie))
        .catch(error => res.status(400).json(error))
}


function getAllStrategie(req, res, next) {
    Strategie.getAllStrategieInModel()
        .then(strategie => res.status(200).json(strategie))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableStrategie,
    selectStatsPapbStrategie,
    addStrategie,
    updateStrategie,
    getAsingleStrategie,
    strategies_getByParams,
    getAllStrategie,
    strategieSelectBy
}