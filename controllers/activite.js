const Activite = require("../models/activite")

 
function addActivite(req, res,next){
    const objActivite={
        numero: req.body.numero,
        strategieId: req.body.strategieId,
        libelle: req.body.libelle,
        estActif:1
    }
     Activite.activiteSelectByInModel(objActivite)
          .then(activite=> {
                if(activite.length==0){
                    const activiteObj={
                        strategieId: req.body.strategieId,
                        natureId: req.body.natureId,
                        statut: req.body.statut,
                        uniteCompteId: req.body.uniteCompteId,
                        cdmtNatDepenseId: req.body.cdmtNatDepenseId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      Activite.addActiviteInModel(activiteObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette activite existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function activiteSelectBy(req, res, next){
    const activiteObj={
        id: req.body.id || null,
        strategieId: req.body.strategieId || null,
        nature: req.body.nature || null,
        statut: req.body.statut || null,
        uniteCompteId: req.body.uniteCompteId || null,
        cdmtNatDepenseId: req.body.cdmtNatDepenseId || null,
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


    Activite.activiteSelectByInModel(activiteObj)
        .then(activite=> res.status(200).json(activite))
        .catch(error=> res.status(400).json(error))

}
 
function updateActivite(req,res, next){
        
    const objActivite={
        numero: req.body.numero,
        strategieId: req.body.strategieId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Activite.activiteSelectByInModel(objActivite)
          .then(activite=> {
                if((activite.length==0) || (activite[0].id == req.body.id)){
                    
                    const activiteObj={
                        id: req.body.id,
                        strategieId: req.body.strategieId,
                        nature: req.body.nature,
                        statut: req.body.statut,
                        uniteCompteId: req.body.uniteCompteId,
                        cdmtNatDepenseId: req.body.cdmtNatDepenseId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Activite.updateActiviteInModel(activiteObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette activite existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un activite
function disableActivite(req, res, next) {
 const activiteObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Activite.disableActiviteInModel(activiteObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleActivite(req, res, next) {
    const id = req.params.id
    Activite.getActiviteByIdInModel(id)
        .then(activite => res.status(200).json(activite))
        .catch(error => res.status(400).json(error))
}


function getAllActivite(req, res, next) {
    Activite.getAllActiviteInModel()
        .then(activite => res.status(200).json(activite))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableActivite,
    addActivite,
    updateActivite,
    getAsingleActivite,
    getAllActivite,
    activiteSelectBy
}