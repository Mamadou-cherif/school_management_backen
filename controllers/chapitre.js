const Chapitre= require("../models/chapitre")

  function chapitreSelectBy(req, res, next){
    const chapitreObj={
      id: null,
      prograGleId: req.body.prograGleId || null,
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

    Chapitre.chapitreSelectByInModel(chapitreObj)
    .then(chapitre=> res.status(200).json(chapitre))
    .catch(error=> res.status(400).json({error}))
    
  }

  
 
function getAllChapitre(req, res, next) {

  Chapitre.getAllChapitreInModel(req)
    .then(chapitre => res.status(200).json(chapitre))
    .catch(error => res.status(400).json(error))
}



function selectByIdChapitre(req, res, next) {
  const id = req.params.id
  Chapitre.chapitreSelectByIdInModel(id)
    .then(chapitre => res.status(200).json(chapitre))
    .catch(error => res.status(400).json(error))
}


function addChapitre(req, res, next) {
  const chapitreObj = {
    prograGleId: req.body.prograGleId,
    numero: req.body.numero,
    estActif: 1
  }
   Chapitre.chapitreSelectByInModel(chapitreObj)
  .then(chapitre => {
     if (chapitre.length == 0) {
        // const chapitreObj = {
        //     prograGleId: req.body.prograGleId,
        //     numero: req.body.numero,
        //     libelle: req.body.libelle,
        //     estActif: 1
        //   }
        //    Chapitre.chapitreSelectByInModel(chapitreObj)
        //   .then(chapitre => {
        //      if (chapitre.length == 0) {
                const chapitreObj={
                    prograGleId: req.body.prograGleId,
                    numero: req.body.numero,
                    libelle: req.body.libelle,
                    observations: req.body.observations ,
                    creationUserId: req.body.creationUserId ,
                    }
              Chapitre.addChapitreInModel(chapitreObj)
                .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée chapitres_insert" }));
              
        //      }
        //     else{
        //       return res.status(400).json({error: "Ce chapitre existe déjà!"})
        //     }
        // })
        // .catch(error => console.log(error))
     }
    else{
      return res.status(400).json({error: "Ce chapitre existe déjà!"})
    }
})
.catch(error => console.log(error))
}


function updateChapitre(req, res, next) {
  const chapitreObj = {
    prograGleId: req.body.prograGleId,
    libelle: req.body.libelle,
    numero: req.body.numero,
    estActif: 1
  }
        Chapitre.chapitreSelectByInModel(chapitreObj)
          .then(chapitre => { 
            if ((chapitre.length == 0 )|| (chapitre[0].id == req.body.id)) {
                const chapitreObj={
                  id: req.body.id ,
                  prograGleId: req.body.prograGleId,
                  numero: req.body.numero,
                  libelle: req.body.libelle,
                  observations: req.body.observations,
                  modifDate: req.body.modifDate,
                  modifUserId: req.body.modifUserId
                }

              Chapitre.updateChapitreInModel(chapitreObj)
                .then(() => res.status(200).json({ succes: "modification effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée chapitres_insert" }));
            }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée chapitres_selectBy" }))
}



function disableChapitre(req, res, next) {

  const objChapitre = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Chapitre.disableChapitreInModel(objChapitre)
    .then(() => res.status(200).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de disable" }));

}





module.exports={  
  selectByIdChapitre,
  getAllChapitre,
  addChapitre,
  disableChapitre,
  updateChapitre,
  chapitreSelectBy
}




 
