const EnseignantClasse = require("../models/enseignantclasse")

function enseignantclasseSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    sessionId: req.body.sessionId || null,
    enseignantId: req.body.enseignantId || null,
    classeId: req.body.classeId || null,
    estPpricipale: req.body.estPpricipale || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
EnseignantClasse.enseignantclasseSelectByInModel(obj)
    .then(enseignantclasse => res.status(200).json(enseignantclasse))
    .catch(error => res.status(400).json({ error }))
}

function selectAllEnseignantClasse(req, res, next) {

    EnseignantClasse.selectAllEnseignantClasse(req)
    .then(enseignantclasse => res.status(200).json(enseignantclasse))
    .catch(error => res.status(400).json(error))
}

function selectEnseignantClasseById(req, res, next) {
  const id = req.params.id
  EnseignantClasse.selectEnseignantClasseById(id)
    .then(enseignantclasse => res.status(200).json(enseignantclasse))
    .catch(error => res.status(400).json(error))
}


function addEnseignantClasse(req, res, next) {
  const enseignantclasseObj = {
    sessionId: req.body.sessionId,
    classeId: req.body.classeId,
    enseignantId: req.body.enseignantId,
    estActif: 1,
  }

  EnseignantClasse.enseignantclasseSelectByInModel(enseignantclasseObj)
    .then(enseignantclasse => {
      if (enseignantclasse.length == 0) {
        const enseignantclasseObj = {
          sessionId: req.body.sessionId,
          enseignantId: req.body.enseignantId,
          classeId: req.body.classeId,
          estPpricipale: req.body.estPpricipale,
          creationUserId: req.body.creationUserId,
        }

        EnseignantClasse.addEnseignantClasseInModel(enseignantclasseObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée enseignantclasse_insert" }));
   
      }
      else {
        res.status(500).json({ error: "Cette enseignantclasse existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée enseignantclasse_selectBy" }))
}


function updateEnseignantClasse(req, res, next) {
  const enseignantclasseObj = {
    sessionId: req.body.sessionId,
    classeId: req.body.classeId,
    enseignantId: req.body.enseignantId,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  EnseignantClasse.enseignantclasseSelectByInModel(enseignantclasseObj)
    .then(enseignantclasse => {
      if ((enseignantclasse.length == 0) || (enseignantclasse[0].id == req.body.id)) {
        const enseignantclasseObj = {
            id: req.body.id,
            sessionId: req.body.sessionId,
            enseignantId: req.body.enseignantId,
            classeId: req.body.classeId,
            estPpricipale: req.body.estPpricipale,
            modifDate: req.body.modifDate,
          }

        EnseignantClasse.updateEnseignantClasseInModel(enseignantclasseObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée enseignantclasse_update" }));
    
        }
      else {
        res.status(500).json({ error: "Cette enseignantclasse existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée enseignantclasse_selectBy" }))
}


//supression logique d'un axe
function deleteEnseignantClasse(req, res, next) {
  EnseignantClasse.deleteEnseignantClasseInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  enseignantclasseSelectBy,
  selectAllEnseignantClasse,
  selectEnseignantClasseById,
  addEnseignantClasse,
  updateEnseignantClasse,
  deleteEnseignantClasse
}