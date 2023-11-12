const Ecole = require("../models/ecole")

function ecoleSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    libelle: req.body.libelle || null,
    slogan: req.body.slogan || null,
    dateCreation: req.body.dateCreation || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Ecole.ecoleSelectByInModel(obj)
    .then(ecole => res.status(200).json(ecole))
    .catch(error => res.status(400).json({ error }))
}

function selectAllEcole(req, res, next) {

    Ecole.selectAllEcole(req)
    .then(ecole => res.status(200).json(ecole))
    .catch(error => res.status(400).json(error))
}

function selectEcoleById(req, res, next) {
  const id = req.params.id
  Ecole.selectEcoleById(id)
    .then(ecole => res.status(200).json(ecole))
    .catch(error => res.status(400).json(error))
}


function addEcole(req, res, next) {
  const ecoleObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  Ecole.ecoleSelectByInModel(ecoleObj)
    .then(ecole => {
      if (ecole.length == 0) {
        const ecoleObj = {
          libelle: req.body.libelle,
          slogan: req.body.slogan,
          dateCreation: req.body.dateCreation,
          creationUserId: req.body.creationUserId,
        }

        Ecole.addEcoleInModel(ecoleObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ecole_insert" }));
   
      }
      else {
        res.status(500).json({ error: "Cette ecole existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ecole_selectBy" }))
}


function updateEcole(req, res, next) {
  const ecoleObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  Ecole.ecoleSelectByInModel(ecoleObj)
    .then(ecole => {
      if ((ecole.length == 0) || (ecole[0].id == req.body.id)) {
        const ecoleObj = {
            id: req.body.id,
            libelle: req.body.libelle,
            slogan: req.body.slogan,
            dateCreation: req.body.dateCreation,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }

        Ecole.updateEcoleInModel(ecoleObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ecole_update" }));
    
        }
      else {
        res.status(500).json({ error: "Cette ecole existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée ecole_selectBy" }))
}


//supression logique d'un axe
function deleteEcole(req, res, next) {
  Ecole.deleteEcoleInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  ecoleSelectBy,
  selectAllEcole,
  selectEcoleById,
  addEcole,
  updateEcole,
  deleteEcole
}