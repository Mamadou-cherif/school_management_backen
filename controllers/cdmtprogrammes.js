const CdmtProgramme = require("../models/cdmtprogrammes")

 
function addCdmtProgramme(req, res,next){
    const objCdmtProgramme={
        libelle: req.body.libelle,
        estActif:1
    }
     CdmtProgramme.cdmtprogrammeSelectByInModel(objCdmtProgramme)
          .then(cdmtprogramme=> {
                if(cdmtprogramme.length==0){
                    const cdmtprogrammeObj={
                        libelle: req.body.libelle,
                        code: req.body.code,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                }
                      CdmtProgramme.addCdmtProgrammeInModel(cdmtprogrammeObj)
                          .then(()=> res.status(201).json({succes: "Ajout effectué avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette cdmtprogramme existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}



function cdmtprogrammeSelectBy(req, res, next){
    const cdmtprogrammeObj={
        id: req.body.id || null,
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


    CdmtProgramme.cdmtprogrammeSelectByInModel(cdmtprogrammeObj)
        .then(cdmtprogramme=> res.status(200).json(cdmtprogramme))
        .catch(error=> res.status(400).json(error))

}







 
function updateCdmtProgramme(req,res, next){
        
    const objCdmtProgramme={
        libelle: req.body.libelle,
        estActif:1
    }
   
     CdmtProgramme.cdmtprogrammeSelectByInModel(objCdmtProgramme)
          .then(cdmtprogramme=> {
                if((cdmtprogramme.length==0) || (cdmtprogramme[0].id == req.body.id)){
                    
                    const cdmtprogrammeObj={
                        id: req.body.id,
                        libelle: req.body.libelle,
                        code: req.body.code,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                }

                      CdmtProgramme.updateCdmtProgrammeInModel(cdmtprogrammeObj)
                          .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                          .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Cette cdmtprogramme existe déjà pour ce projet"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
      
        }

//supression logique d'un cdmtprogramme
function disableCdmtProgramme(req, res, next) {
 const cdmtprogrammeObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    CdmtProgramme.disableCdmtProgrammeInModel(cdmtprogrammeObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}



function getAsingleCdmtProgramme(req, res, next) {
    const id = req.params.id
    CdmtProgramme.getCdmtProgrammeByIdInModel(id)
        .then(cdmtprogramme => res.status(200).json(cdmtprogramme))
        .catch(error => res.status(400).json(error))
}


function getAllCdmtProgramme(req, res, next) {
    CdmtProgramme.getAllCdmtProgrammeInModel()
        .then(cdmtprogramme => res.status(200).json(cdmtprogramme))
        .catch(error => res.status(400).json(error))
    }

module.exports = {
    disableCdmtProgramme,
    addCdmtProgramme,
    updateCdmtProgramme,
    getAsingleCdmtProgramme,
    getAllCdmtProgramme,
    cdmtprogrammeSelectBy
}