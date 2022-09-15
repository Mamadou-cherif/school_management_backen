const DefisprogrammePrioritaire = require("../models/defisprgpriroritaire")

 
function addDefisprogrammePrioritaire(req, res,next){
    const objDefisprogrammePrioritaire={
        proPrioritaireId: req.body.proPrioritaireId,
        libelle: req.body.libelle,
        estActif:1
    }
     DefisprogrammePrioritaire.defisprogrammePrioritaireSelectByInModel(objDefisprogrammePrioritaire)
          .then(defisprogrammeprioritaire=> {
                if(defisprogrammeprioritaire.length==0){
                    const defisprogrammeprioritaireObj={
                        proPrioritaireId: req.body.proPrioritaireId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      DefisprogrammePrioritaire.addDefisprogrammePrioritaireInModel(defisprogrammeprioritaireObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette defisprogrammeprioritaire existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function defisprogrammeprioritaireSelectBy(req, res, next){
    const defisprogrammeprioritaireObj={
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


    DefisprogrammePrioritaire.defisprogrammePrioritaireSelectByInModel(defisprogrammeprioritaireObj)
        .then(defisprogrammeprioritaire=> res.status(200).json(defisprogrammeprioritaire))
        .catch(error=> res.status(400).json(error))

}







 
function updateDefisprogrammePrioritaire(req,res, next){
        
    const objDefisprogrammePrioritaire={
        proprioritaireId: req.body.proprioritaireId,
        libelle: req.body.libelle,
        estActif:1
    }
    console.log(objDefisprogrammePrioritaire)
   
     DefisprogrammePrioritaire.defisprogrammePrioritaireSelectByInModel(objDefisprogrammePrioritaire)
          .then(defisprogrammeprioritaire=> {
                if((defisprogrammeprioritaire.length==0) || (defisprogrammeprioritaire[0].id == req.body.id)){
                    
                    const defisprogrammeprioritaireObj={
                        id: req.body.id,
                        proprioritaireId: req.body.proprioritaireId,
                        numero: req.body.numero,
                        libelle: req.body.libelle,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      DefisprogrammePrioritaire.updateDefisprogrammePrioritaireInModel(defisprogrammeprioritaireObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette defisprogrammeprioritaire existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un defisprogrammeprioritaire
function disableDefisprogrammePrioritaire(req, res, next) {
 const defisprogrammeprioritaireObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    DefisprogrammePrioritaire.disableDefisprogrammePrioritaireInModel(defisprogrammeprioritaireObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleDefisprogrammePrioritaire(req, res, next) {
    const id = req.params.id
    DefisprogrammePrioritaire.getDefisprogrammePrioritaireByIdInModel(id)
        .then(defisprogrammeprioritaire => res.status(200).json(defisprogrammeprioritaire))
        .catch(error => res.status(400).json(error))
}


function getAllDefisprogrammePrioritaire(req, res, next) {
    DefisprogrammePrioritaire.getAllDefisprogrammePrioritaireInModel()
        .then(defisprogrammeprioritaire => res.status(200).json(defisprogrammeprioritaire))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableDefisprogrammePrioritaire,
    addDefisprogrammePrioritaire,
    updateDefisprogrammePrioritaire,
    getAsingleDefisprogrammePrioritaire,
    getAllDefisprogrammePrioritaire,
    defisprogrammeprioritaireSelectBy
}