const Papb = require("../models/papb")

 
function addPapb(req, res,next){
    const objPapb={
        proGleId: req.body.proGleId,
        libelle: req.body.libelle,
        estActif:1
    }
     Papb.papbsSelectByInModel(objPapb)
          .then(papb=> {
                if(papb.length==0){
                    const papbsObj={
                        proGleId: req.body.proGleId,
                        libelle: req.body.libelle,
                        debut: req.body.debut,
                        fin: req.body.fin,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      Papb.addPapbInModel(papbsObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette papb existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function papbsSelectBy(req, res, next){
    const papbsObj={
        id: req.body.id || null,
        proGleId: req.body.proGleId || null,
        libelle: req.body.libelle || null,
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


    Papb.papbsSelectByInModel(papbsObj)
        .then(papb=> res.status(200).json(papb))
        .catch(error=> res.status(400).json(error))

}







 
function updatePapb(req,res, next){
        
    const objPapb={
        proGleId: req.body.proGleId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     Papb.papbsSelectByInModel(objPapb)
          .then(papb=> {
                if((papb.length==0) || (papb[0].id == req.body.id)){
                    
                    const papbsObj={
                        id: req.body.id,
                        proGleId: req.body.proGleId,
                        libelle: req.body.libelle,
                        debut: req.body.debut,
                        fin: req.body.fin,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      Papb.updatePapbInModel(papbsObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette papb existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un papb
function disablePapb(req, res, next) {
 const papbsObj={
        id: req.body.id,
       modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    Papb.disablePapbInModel(papbsObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsinglePapb(req, res, next) {
    const id = req.params.id
    Papb.getPapbByIdInModel(id)
        .then(papb => res.status(200).json(papb))
        .catch(error => res.status(400).json(error))
}


function getAllPapbs(req, res, next) {
    Papb.getAllPapbInModel()
        .then(papbs => res.status(200).json(papbs))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disablePapb,
    addPapb,
    updatePapb,
    getAsinglePapb,
    getAllPapbs,
    papbsSelectBy
}