const storySale = require("../models/storysale")

function storysaleSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    typePayements: req.body.typePayements || null,
    tranche: req.body.tranche || null,
    mois: req.body.mois || null,
    prix: req.body.prix || null,
    datePayement: req.body.datePayement || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
storySale.storysaleSelectByInModel(obj)
    .then(storysale => res.status(200).json(storysale))
    .catch(error => res.status(400).json({ error }))
}

function selectAllstorySale(req, res, next) {

    storySale.selectAllstorySale(req)
    .then(storysale => res.status(200).json(storysale))
    .catch(error => res.status(400).json(error))
}

function selectstorySaleById(req, res, next) {
  const id = req.params.id
  storySale.selectstorySaleById(id)
    .then(storysale => res.status(200).json(storysale))
    .catch(error => res.status(400).json(error))
}


function addstorySale(req, res, next) {
  let tabFromFront = req.body
    const storysaleObj = {
        eleveId: req.body.eleveId,
        trancheId: req.body.trancheId,
        prestationId: req.body.prestationId,
        mois: req.body.mois,
        prix: req.body.prix,
        datePayement: req.body.datePayement,
        typePayements: req.body.typePayements,
        creationUserId: req.body.creationUserId,
    }
    storySale.addstorySaleInModel(storysaleObj)
    .then(data => res.status(201).json(data))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée storysale_insert" }));
  
  }


function updatestorySale(req, res, next) {
  const storysaleObj = {
    id: req.body.id,
    typePayements: req.body.typePayements,
    tranche: req.body.tranche,
    mois: req.body.mois,
    prix: req.body.prix,
    datePayement: req.body.datePayement,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

storySale.updatestorySaleInModel(storysaleObj)
.then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée storysale_update" }));

  }


//supression logique d'un axe
function deletestorySale(req, res, next) {
  storySale.deletestorySaleInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  storysaleSelectBy,
  selectAllstorySale,
  selectstorySaleById,
  addstorySale,
  updatestorySale,
  deletestorySale
}