const Flotte = require("../models/flotte")

function flotteSelectBy(req, res, next) {
    const flotteObj={
        id: req.body.id || null,
        libelle: req.body.libelle || null,
        Responsable: req.body.Responsable || null,
        telephone: req.body.telephone || null,
        email: req.body.email || null,
        estActif:1,
        creationDate:null,
        creationUserId:null,
        modifDate:null,
        modifUserId:null
    }
  Flotte.flotteSelectByInModel(flotteObj)
    .then(flottes => res.status(200).json(flottes))
    .catch(error => res.status(400).json({ error }))
}

function selectAllFlotte(req, res, next) {

  Flotte.selectAllFlotteInModel(req)
    .then(flottes => res.status(200).json(flottes))
    .catch(error => res.status(400).json(error))
}

function selectByIdFlotte(req, res, next) {
  const id = req.params.id
  Flotte.selectByIdFlotteInModel(id)
    .then(flotte => res.status(200).json(flotte))
    .catch(error => res.status(400).json(error))
}


function addFlotte(req, res, next) {
  const flotteObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  Flotte.flotteSelectByInModel(flotteObj)
    .then(flottes => {
      if (flottes.length == 0) {
        const flotteObj={
            libelle: req.body.libelle ,
            Responsable: req.body.Responsable ,
            telephone: req.body.telephone ,
            email: req.body.email ,
            creationUserId: req.body.creationUserId ,
        }
        Flotte.addFlotteInModel(flotteObj)
        .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée flottes_insert" }));
        
      }
      else {
        res.status(500).json({ error: "Cette flotte existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée flottes_selectBy" }))

}


function updateFlotte(req, res) {
    const flotteObj = {
        libelle: req.body.libelle,
        estActif: 1,
      }

      Flotte.flotteSelectByInModel(flotteObj)
        .then(flottes => {
          if (flottes.length == 0 || flottes[0].id == req.body.id) {

            const flotteObj={
                id: req.body.id,
                libelle: req.body.libelle ,
                Responsable: req.body.Responsable ,
                telephone: req.body.telephone ,
                email: req.body.email ,
                modifUserId: req.body.modifUserId ,
                modifDate: req.body.modifDate
            }

            Flotte.updateFlotteInModel(flotteObj)
            .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
            .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée flottes_update" }));
          }
          else {
            res.status(500).json({ error: "Cette flotte existe déjà" })
          }
        })
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée flottes_selectBy" }))
    

  
 
}


//supression logique d'un axe
function deleteFlotte(req, res, next) {
  Flotte.deleteFlotteInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));



}


module.exports = {
  flotteSelectBy,
  selectAllFlotte,
  selectByIdFlotte,
  addFlotte,
  updateFlotte,
  deleteFlotte

}