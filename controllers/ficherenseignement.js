const FicheRen = require("../models/ficherenseignement")

function ficherenSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    prestationId: req.body.prestationId || null,
    classeId: req.body.classeId || null,
    ecoleId: req.body.ecoleId || null,
    prix: req.body.prix || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
FicheRen.ficherenSelectByInModel(obj)
    .then(ficheren => res.status(200).json(ficheren))
    .catch(error => res.status(400).json({ error }))
}

function selectAllFicheRen(req, res, next) {

    FicheRen.selectAllFicheRen(req)
    .then(ficheren => res.status(200).json(ficheren))
    .catch(error => res.status(400).json(error))
}

function selectFicheRenById(req, res, next) {
  const id = req.params.id
  FicheRen.selectFicheRenById(id)
    .then(ficheren => res.status(200).json(ficheren))
    .catch(error => res.status(400).json(error))
}


function addFicheRen(req, res, next) {
  const ficherenObj = {
    prestationId: req.body.prestationId,
    classeId: req.body.classeId,
    ecoleId: req.body.ecoleId,
    estActif: 1,
  }

  console.log(ficherenObj)
  FicheRen.ficherenSelectByInModel(ficherenObj)
    .then(ficheren => {
      if (ficheren.length == 0) {
        const ficherenObj = {
          prestationId: req.body.prestationId,
          classeId: req.body.classeId ,
          ecoleId: req.body.ecoleId,
          prix: req.body.prix,
          creationUserId: req.body.creationUserId,
        }

        FicheRen.addFicheRenInModel(ficherenObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ficheren_insert" }));
   
      }
      else {
        res.status(500).json({ error: "Dupplicatat de cette fiche" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ficheren_selectBy" }))
}


function updateFicheRen(req, res, next) {
  const ficherenObj = {
    prestationId: req.body.prestationId,
    classeId: req.body.classeId,
    ecoleId: req.body.ecoleId,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  FicheRen.ficherenSelectByInModel(ficherenObj)
    .then(ficheren => {
      if ((ficheren.length == 0) || (ficheren[0].id == req.body.id)) {
        const ficherenObj = {
            id: req.body.id,
            prestationId: req.body.prestationId,
            classeId: req.body.classeId,
            ecoleId: req.body.ecoleId,
            prix: req.body.prix,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }

        FicheRen.updateFicheRenInModel(ficherenObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ficheren_update" }));
    
        }
      else {
        res.status(500).json({ error: "Cette ficheren existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ficheren_selectBy" }))
}


//supression logique d'un axe
function deleteFicheRen(req, res, next) {
  FicheRen.deleteFicheRenInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}

function disableFicheRen(req, res, next){
  const obj={
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }
  FicheRen.disableFicheRenInModel(obj)
  .then(()=> res.status(200).json({succes: "La suppression a reussi"}))
  .catch(error => res.status(400).json(error))

}

module.exports = {
  ficherenSelectBy,
  selectAllFicheRen,
  selectFicheRenById,
  addFicheRen,
  disableFicheRen,
  updateFicheRen,
  deleteFicheRen
}