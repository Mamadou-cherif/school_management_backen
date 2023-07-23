const BonLivraison = require("../models/bonlivraison")

function bonlivraisonSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        contratId: req.body.contratId || null,
        flotteId: req.body.flotteId || null,
        camionId: req.body.camionId || null,
        chauffeurId: req.body.chauffeurId || null,
        trajetId: req.body.trajetId || null,
        equipeId: req.body.equipeId || null,
        numeroBl: req.body.numeroBl || null,
        dateChargement: req.body.dateChargement || null,
        heure: req.body.heure || null,
        poidsChargee: req.body.poidsChargee || null,
        poidsVide: req.body.poidsVide || null,
        tonnageSurBon: req.body.tonnageSurBon || null,
        distanceMine: req.body.distanceMine || null,
        statutBon: req.body.statutBon || null,
        observations: req.body.observations || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
BonLivraison.bonlivraisonSelectByInModel(obj)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json({ error }))
}




function selectAllBonLivraison(req, res, next) {

    BonLivraison.selectAllBonLivraisonInModel(req)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}


function getPointageToExportByDay(req, res, next) {
  const obj={
    dateChargement: req.body.dateChargement
  }
  BonLivraison.getPointageToExportByDay(obj)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}

function getPointageToEexportToExcel(req, res, next) {

  BonLivraison.getPointageToEexportToExcel()
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}
function selectByIdBonLivraison(req, res, next) {
  const id = req.params.id
  BonLivraison.selectByIdBonLivraisonInModel(id)
    .then(bonlivraison => res.status(200).json(bonlivraison))
    .catch(error => res.status(400).json(error))
}


function addBonLivraison(req, res, next) {
    const obj={
      numeroBl: req.body.numeroBl,
        estActif:1,
    }
  BonLivraison.bonlivraisonSelectByInModel(obj)
    .then(bonlivraison => {
      console.log(req.body.distanceMine)
      if (bonlivraison.length == 0) {
        const bonlivraisonObj = {
          contratId: req.body.contratId,
          flotteId: req.body.flotteId,
          camionId: req.body.camionId,
          chauffeurId: req.body.chauffeurId,
          trajetId: req.body.trajetId,
          equipeId: req.body.equipeId,
          numeroBl: req.body.numeroBl,
          dateChargement: req.body.dateChargement,
          heure: req.body.heure,
          poidsChargee: req.body.poidsChargee,
          poidsVide: req.body.poidsVide,
          tonnageSurBon: req.body.tonnageSurBon,
          statutBon: req.body.statutBon,
          distanceMine: req.body.distanceMine,
          observations: req.body.observations,
          creationUserId: req.body.creationUserId,
        }
       
        BonLivraison.addBonLivraisonInModel(bonlivraisonObj)
        .then(() => res.status(201).json({succes: "ajout réussi"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_insert" }));
      
      }
      else {
        res.status(500).json({ error: "Dupplicatat du numero de bon saisi" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_selectBy" }))

  }


function updateBonLivraison(req, res, next) {
  const obj={
    numeroBl: req.body.numeroBl,
    estActif:1,
}
BonLivraison.bonlivraisonSelectByInModel(obj)
.then(bonlivraison => {
  if (bonlivraison.length == 0 || req.body.id== bonlivraison[0].id) {
    const bonlivraisonObj = {
      id: req.body.id,
      contratId: req.body.contratId,
      flotteId: req.body.flotteId,
      camionId: req.body.camionId,
      chauffeurId: req.body.chauffeurId,
      trajetId: req.body.trajetId,
      equipeId: req.body.equipeId,
      numeroBl: req.body.numeroBl,
      dateChargement: req.body.dateChargement,
      heure: req.body.heure,
      poidsChargee: req.body.poidsChargee,
      poidsVide: req.body.poidsVide,
      tonnageSurBon: req.body.tonnageSurBon,
      distanceMine: req.body.distanceMine,
      statutBon: req.body.statutBon,
      observations: req.body.observations,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    BonLivraison.updateBonLivraisonInModel(bonlivraisonObj)
    .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_insert" }));
  
  }
  else {
    res.status(500).json({ error: "dupplicatat du numero de bon saisi" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée bonlivraison_selectBy" }))


  }


//supression logique d'un axe
function deleteBonLivraison(req, res, next) {
  BonLivraison.deleteBonLivraisonInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  getPointageToExportByDay,
  getPointageToEexportToExcel,
  bonlivraisonSelectBy,
  selectAllBonLivraison,
  selectByIdBonLivraison,
  addBonLivraison,
  updateBonLivraison,
  deleteBonLivraison
}