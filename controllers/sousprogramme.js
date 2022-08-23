const SousProgramme = require("../models/sousprogramme")

 
function addSousProgramme(req, res,next){
    const objSousProgramme={
        proPrioritaireId: req.body.proPrioritaireId,
        libelle: req.body.libelle,
        estActif:1
    }
     SousProgramme.sousProgrammeSelectByInModel(objSousProgramme)
          .then(sousprogramme=> {
                if(sousprogramme.length==0){
                    const sousprogrammeObj={
                        proPrioritaireId: req.body.proPrioritaireId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      SousProgramme.addSousProgrammeInModel(sousprogrammeObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette sousprogramme existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function sousprogrammeSelectBy(req, res, next){
    const sousprogrammeObj={
        id: req.body.id || null,
        proPrioritaireId: req.body.proPrioritaireId || null,
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


    SousProgramme.sousProgrammeSelectByInModel(sousprogrammeObj)
        .then(sousprogramme=> res.status(200).json(sousprogramme))
        .catch(error=> res.status(400).json(error))

}







 
function updateSousProgramme(req,res, next){
        
    const objSousProgramme={
        proPrioritaireId: req.body.proPrioritaireId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     SousProgramme.sousProgrammeSelectByInModel(objSousProgramme)
          .then(sousprogramme=> {
                if((sousprogramme.length==0) || (sousprogramme[0].id == req.body.id)){
                    
                    const sousprogrammeObj={
                        id: req.body.id,
                        proPrioritaireId: req.body.proPrioritaireId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      SousProgramme.updateSousProgrammeInModel(sousprogrammeObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette sousprogramme existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un sousprogramme
function disableSousProgramme(req, res, next) {
 const sousprogrammeObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    SousProgramme.disableSousProgrammeInModel(sousprogrammeObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleSousProgramme(req, res, next) {
    const id = req.params.id
    SousProgramme.getSousProgrammeByIdInModel(id)
        .then(sousprogramme => res.status(200).json(sousprogramme))
        .catch(error => res.status(400).json(error))
}


function getAllSousProgramme(req, res, next) {
    SousProgramme.getAllSousProgrammeInModel()
        .then(sousprogramme => res.status(200).json(sousprogramme))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableSousProgramme,
    addSousProgramme,
    updateSousProgramme,
    getAsingleSousProgramme,
    getAllSousProgramme,
    sousprogrammeSelectBy
}