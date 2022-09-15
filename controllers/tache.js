const Tache = require("../models/tache")

 
function addTache(req, res,next){
    const objTache={
        activiteId: req.body.activiteId,
        libelle: req.body.libelle,
        estActif:1
    }
     Tache.tacheSelectByInModel(objTache)
          .then(tache=> {
                if(tache.length==0){
                    const tacheObj={
                        activiteId: req.body.activiteId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        duree: req.body.duree,
                        responsable: req.body.responsable,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      Tache.addTacheInModel(tacheObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette tache existe déjà pour cette actvitité"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function tacheSelectBy(req, res, next){
    const tacheObj={
        id: req.body.id || null,
        activiteId: req.body.activiteId || null,
        numero: req.body.numero || null,
        libelle: req.body.libelle || null,
        duree: req.body.duree || null,
        responsable: req.body.responsable || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
    }


    Tache.tacheSelectByInModel(tacheObj)
        .then(tache=> res.status(200).json(tache))
        .catch(error=> res.status(400).json(error))
}







 
function updateTache(req,res, next){
        
    const objTache={
        activiteId: req.body.activiteId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Tache.tacheSelectByInModel(objTache)
          .then(tache=> {
                if((tache.length==0) || (tache[0].id == req.body.id)){
                    
                    const tacheObj={
                        id: req.body.id,
                        activiteId: req.body.activiteId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        duree: req.body.duree,
                        responsable: req.body.responsable,
                        observations: req.body.observations, 
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Tache.updateTacheInModel(tacheObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette tache existe déjà pour cette actvitité"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un tache
function disableTache(req, res, next) {
 const tacheObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Tache.disableTacheInModel(tacheObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleTache(req, res, next) {
    const id = req.params.id
    Tache.getTacheByIdInModel(id)
        .then(tache => res.status(200).json(tache))
        .catch(error => res.status(400).json(error))
}


function getAllTache(req, res, next) {
    Tache.getAllTacheInModel()
        .then(tache => res.status(200).json(tache))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableTache,
    addTache,
    updateTache,
    getAsingleTache,
    getAllTache,
    tacheSelectBy
}