const Equipe = require("../models/equipe")

function equipeSelectBy(req, res, next) {
    const equipeObj={
        id: req.body.id || null,
        contratId: req.body.contratId || null,
        superviseurId: req.body.superviseurId || null,
        libelle: req.body.libelle || null,
        observations: req.body.observations || null,
        heureFin: req.body.heureFin || null,
        heureDebut: req.body.heureDebut || null,
        estActif:1,
        creationDate:null,
        creationUserId:null,
        modifDate:null,
        modifUserId:null
    }
  Equipe.equipeSelectByInModel(equipeObj)
    .then(equipes => res.status(200).json(equipes))
    .catch(error => res.status(400).json({ error }))
}

function selectAllEquipe(req, res, next) {

  Equipe.selectAllEquipeInModel(req)
    .then(equipes => res.status(200).json(equipes))
    .catch(error => res.status(400).json(error))
}

function getPersonnelNotAffectedToEquipe(req, res, next) {
  const id = req.params.id
  Equipe.getPersonnelNotAffectedToEquipe(id)
    .then(equipe => res.status(200).json(equipe))
    .catch(error => res.status(400).json(error))
}
function getSupperviseurNotAffectedToEquipe(req, res, next) {
  const id = req.params.id
  Equipe.getSupperviseurNotAffectedToEquipe(id)
    .then(equipe => res.status(200).json(equipe))
    .catch(error => res.status(400).json(error))
}
function selectByIdEquipe(req, res, next) {
  const id = req.params.id
  Equipe.selectByIdEquipeInModel(id)
    .then(equipe => res.status(200).json(equipe))
    .catch(error => res.status(400).json(error))
}


function addEquipe(req, res, next) {
  const equipeObj = {
    contratId: req.body.contratId,
    libelle: req.body.libelle,
    estActif: 1,
  }

  Equipe.equipeSelectByInModel(equipeObj)
    .then(equipes => {
      if (equipes.length == 0) {
        const equipeObj={
            contratId: req.body.contratId ,
            superviseurId: req.body.superviseurId ,
            libelle: req.body.libelle ,
            observations: req.body.observations ,
            heureFin: req.body.heureFin ,
            heureDebut: req.body.heureDebut ,
            creationUserId: req.body.creationUserId ,
        }
        Equipe.addEquipeInModel(equipeObj)
        .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipes_insert" }));
        
      }
      else {
        res.status(500).json({ error: "Cette equipe existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipes_selectBy" }))

}


function updateEquipe(req, res) {
    const equipeObj = {
        contratId: req.body.contratId,
        libelle: req.body.libelle,
        estActif: 1,
      }

      Equipe.equipeSelectByInModel(equipeObj)
        .then(equipes => {
          if (equipes.length == 0 || equipes[0].id == req.body.id) {

            const equipeObj={
                id: req.body.id,
                contratId: req.body.contratId ,
                superviseurId: req.body.superviseurId ,
                libelle: req.body.libelle ,
                observations: req.body.observations ,
                heureFin: req.body.heureFin ,
                heureDebut: req.body.heureDebut ,
                modifUserId: req.body.modifUserId ,
                modifDate: req.body.modifDate
            }

            Equipe.updateEquipeInModel(equipeObj)
            .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
            .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipes_update" }));
          }
          else {
            res.status(500).json({ error: "Cette equipe existe déjà" })
          }
        })
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipes_selectBy" }))
    

  
 
}


//supression logique d'un axe
function deleteEquipe(req, res, next) {
  Equipe.deleteEquipeInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));



}


module.exports = {
  equipeSelectBy,
  getSupperviseurNotAffectedToEquipe,
  getPersonnelNotAffectedToEquipe,
  selectAllEquipe,
  selectByIdEquipe,
  addEquipe,
  updateEquipe,
  deleteEquipe

}