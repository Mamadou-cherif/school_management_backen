const CdmtNatDepense = require("../models/cdmtnatdepenses")

 
function addCdmtNatDepense(req, res,next){
    const objCdmtNatDepense={

        cdmtProgrammeId: req.body.cdmtProgrammeId,
        libelle: req.body.libelle,
        estActif:1
    }
     CdmtNatDepense.cdmtnatdepenseSelectByInModel(objCdmtNatDepense)
          .then(cdmtnatdepense=> {
                if(cdmtnatdepense.length==0){
                    const cdmtnatdepenseObj={
                        cdmtProgrammeId: req.body.cdmtProgrammeId,
                        libelle: req.body.libelle,
                        code: req.body.code,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      CdmtNatDepense.addCdmtNatDepenseInModel(cdmtnatdepenseObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette cdmtnatdepense existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function cdmtnatdepenseSelectBy(req, res, next){
    const cdmtnatdepenseObj={
        id: req.body.id || null,
        cdmtProgrammeId: req.body.cdmtProgrammeId,
        libelle: req.body.libelle || null,
        code: req.body.code || null,
        observations: req.body.observations || null,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}


    CdmtNatDepense.cdmtnatdepenseSelectByInModel(cdmtnatdepenseObj)
        .then(cdmtnatdepense=> res.status(200).json(cdmtnatdepense))
        .catch(error=> res.status(400).json(error))

}

function updateCdmtNatDepense(req,res, next){
        
    const objCdmtNatDepense={
        cdmtProgrammeId: req.body.cdmtProgrammeId,
        libelle: req.body.libelle,
        estActif:1
    }
   
     CdmtNatDepense.cdmtnatdepenseSelectByInModel(objCdmtNatDepense)
          .then(cdmtnatdepense=> {
                if((cdmtnatdepense.length==0) || (cdmtnatdepense[0].id == req.body.id)){
                    
                    const cdmtnatdepenseObj={
                        id: req.body.id,
                        cdmtProgrammeId: req.body.cdmtProgrammeId,
                        libelle: req.body.libelle,
                        code: req.body.code,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      CdmtNatDepense.updateCdmtNatDepenseInModel(cdmtnatdepenseObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette cdmtnatdepense existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un cdmtnatdepense
function disableCdmtNatDepense(req, res, next) {
 const cdmtnatdepenseObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    CdmtNatDepense.disableCdmtNatDepenseInModel(cdmtnatdepenseObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleCdmtNatDepense(req, res, next) {
    const id = req.params.id
    CdmtNatDepense.getCdmtNatDepenseByIdInModel(id)
        .then(cdmtnatdepense => res.status(200).json(cdmtnatdepense))
        .catch(error => res.status(400).json(error))
}


function getAllCdmtNatDepense(req, res, next) {
    CdmtNatDepense.getAllCdmtNatDepenseInModel()
        .then(cdmtnatdepense => res.status(200).json(cdmtnatdepense))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableCdmtNatDepense,
    addCdmtNatDepense,
    updateCdmtNatDepense,
    getAsingleCdmtNatDepense,
    getAllCdmtNatDepense,
    cdmtnatdepenseSelectBy
}