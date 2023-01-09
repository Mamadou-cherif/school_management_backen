const NiveauScolaire= require("../models/niveauscolaire")

  function niveauscolaireSelectBy(req, res, next){
    const niveauscolaireObj={
      id: req.body.id || null,
      libelle: req.body.libelle || null,
      code: req.body.code || null,
      estActif: 1,
      creationDate: req.body.creationDate || null,
      creationUserId: req.body.creationUserId || null,
      modifDate: req.body.modifDate || null,
      modifUserId: req.body.modifUserId || null,
      debut: req.body.debut || null,
      fin: req.body.fin || null
}

    NiveauScolaire.niveauscolaireSelectByInModel(niveauscolaireObj)
    .then(niveauscolaire=> res.status(200).json(niveauscolaire))
    .catch(error=> res.status(400).json({error}))
    
  }

  
 
function getAllNiveauScolaire(req, res, next) {

  NiveauScolaire.getAllNiveauScolaireInModel(req)
    .then(niveauscolaire => res.status(200).json(niveauscolaire))
    .catch(error => res.status(400).json(error))
}



function getOneNiveauScolaire(req, res, next) {
  const id = req.params.id
  NiveauScolaire.niveauscolaireSelectByIdInModel(id)
    .then(niveauscolaire => res.status(200).json(niveauscolaire))
    .catch(error => res.status(400).json(error))
}


function addNiveauScolaire(req, res, next) {
  const niveauscolaireObj = {
    code: req.body.code,
    libelle: req.body.libelle,
    estActif: 1
  }
   NiveauScolaire.niveauscolaireSelectByInModel(niveauscolaireObj)
  .then(niveauscolaire => {
     if (niveauscolaire.length == 0) {
        // const niveauscolaireObj = {
        //     prograGleId: req.body.prograGleId,
        //     numero: req.body.numero,
        //     libelle: req.body.libelle,
        //     estActif: 1
        //   }
        //    NiveauScolaire.niveauscolaireSelectByInModel(niveauscolaireObj)
        //   .then(niveauscolaire => {
        //      if (niveauscolaire.length == 0) {
                const niveauscolaireObj={
                    code: req.body.code,
                    libelle: req.body.libelle,
                    creationUserId: req.body.creationUserId ,
                    }
              NiveauScolaire.addNiveauScolaireInModel(niveauscolaireObj)
                .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée niveauscolaires_insert" }));
              
        //      }
        //     else{
        //       return res.status(400).json({error: "Ce niveauscolaire existe déjà!"})
        //     }
        // })
        // .catch(error => console.log(error))
     }
    else{
      return res.status(400).json({error: "Ce niveauscolaire existe déjà!"})
    }
})
.catch(error => console.log(error))
}


function updateNiveauScolaire(req, res, next) {
  const niveauscolaireObj = {
    code: req.body.code,
    libelle: req.body.libelle,
    estActif: 1
  }
        NiveauScolaire.niveauscolaireSelectByInModel(niveauscolaireObj)
          .then(niveauscolaire => { 
            if ((niveauscolaire.length == 0 )|| (niveauscolaire[0].id == req.body.id)) {
                const niveauscolaireObj={
                  id: req.body.id ,
                  code: req.body.code,
                  libelle: req.body.libelle,
                  observations: req.body.observations,
                  modifDate: req.body.modifDate,
                  modifUserId: req.body.modifUserId
                }

              NiveauScolaire.updateNiveauScolaireInModel(niveauscolaireObj)
                .then(() => res.status(200).json({ succes: "modification effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée niveauscolaires_insert" }));
            }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée niveauscolaires_selectBy" }))
}



function disableNiveauScolaire(req, res, next) {
  const objNiveauScolaire = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  NiveauScolaire.disableNiveauScolaireInModel(objNiveauScolaire)
    .then(() => res.status(200).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de disable" }));

}


module.exports={  
  getOneNiveauScolaire,
  getAllNiveauScolaire,
  addNiveauScolaire,
  disableNiveauScolaire,
  updateNiveauScolaire,
  niveauscolaireSelectBy
}