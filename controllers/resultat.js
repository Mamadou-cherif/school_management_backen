const Resultat = require("../models/resultat")

 
function addResultat(req, res,next){
    const objResultat={
        sousProgrammeId: req.body.sousProgrammeId,
        libelle: req.body.libelle,
        estActif:1
    }
     Resultat.sousProgrammeSelectByInModel(objResultat)
          .then(resultat=> {
                if(resultat.length==0){
                    const resultatObj={
                        sousProgrammeId: req.body.sousProgrammeId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      Resultat.addResultatInModel(resultatObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette resultat existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function resultatSelectBy(req, res, next){
    const resultatObj={
        id: req.body.id || null,
        sousProgrammeId: req.body.sousProgrammeId || null,
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


    Resultat.sousProgrammeSelectByInModel(resultatObj)
        .then(resultat=> res.status(200).json(resultat))
        .catch(error=> res.status(400).json(error))

}







 
function updateResultat(req,res, next){
        
    const objResultat={
        sousProgrammeId: req.body.sousProgrammeId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Resultat.sousProgrammeSelectByInModel(objResultat)
          .then(resultat=> {
                if((resultat.length==0) || (resultat[0].id == req.body.id)){
                    
                    const resultatObj={
                        id: req.body.id,
                        sousProgrammeId: req.body.sousProgrammeId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Resultat.updateResultatInModel(resultatObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette resultat existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un resultat
function disableResultat(req, res, next) {
 const resultatObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Resultat.disableResultatInModel(resultatObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleResultat(req, res, next) {
    const id = req.params.id
    Resultat.getResultatByIdInModel(id)
        .then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error))
}


function getAllResultat(req, res, next) {
    Resultat.getAllResultatInModel()
        .then(resultat => res.status(200).json(resultat))
        .catch(error => res.status(400).json(error))
}

module.exports = {
    disableResultat,
    addResultat,
    updateResultat,
    getAsingleResultat,
    getAllResultat,
    resultatSelectBy
}