const typeFonction = require("../models/typefonction")

function typefonctionSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    libelle: req.body.libelle || null,
    observations: req.body.observations || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
typeFonction.type_fonctionsSelectByInModel(obj)
    .then(typefonctions => res.status(200).json(typefonctions))
    .catch(error => res.status(400).json({ error }))
}

function selectAlltypeFonction(req, res, next) {

    typeFonction.selectAlltypeFonctionsInModel(req)
    .then(typefonctions => res.status(200).json(typefonctions))
    .catch(error => res.status(400).json(error))
}

function selectByIdtypeFonction(req, res, next) {
  const id = req.params.id
  typeFonction.selectByIdtypeFonctionsInModel(id)
    .then(typefonction => res.status(200).json(typefonction))
    .catch(error => res.status(400).json(error))
}


function addtypeFonction(req, res, next) {
  const typefonctionObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  typeFonction.type_fonctionsSelectByInModel(typefonctionObj)
    .then(typefonctions => {
      if (typefonctions.length == 0) {
        const typefonctionObj = {
          libelle: req.body.libelle,
          observations: req.body.observations,
          creationUserId: req.body.creationUserId,
        }

        typeFonction.addtypeFonctionsInModel(typefonctionObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée typefonctions_insert" }));
   
      }
      else {
        res.status(500).json({ error: "Cette typefonction existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée typefonctions_selectBy" }))
}


function updatetypeFonction(req, res, next) {
  const typefonctionObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  typeFonction.type_fonctionsSelectByInModel(typefonctionObj)
    .then(typefonctions => {
      if ((typefonctions.length == 0) || (typefonctions[0].id == req.body.id)) {
        const typefonctionObj = {
            id: req.body.id,
            libelle: req.body.libelle,
            observations: req.body.observations,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }

        typeFonction.updatetypeFonctionsInModel(typefonctionObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée typefonctions_update" }));
    
        }
      else {
        res.status(500).json({ error: "Cette typefonction existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée typefonctions_selectBy" }))
}


//supression logique d'un axe
function deletetypeFonction(req, res, next) {
  typeFonction.deletetypeFonctionsInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  typefonctionSelectBy,
  selectAlltypeFonction,
  selectByIdtypeFonction,
  addtypeFonction,
  updatetypeFonction,
  deletetypeFonction
}