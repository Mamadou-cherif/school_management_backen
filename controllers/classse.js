const Classse = require("../models/classse")

function classseSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    ecoleId: req.body.ecoleId || null,
    enseignantId: req.body.enseignantId || null,
    niveau: req.body.niveau || null,
    etape: req.body.etape || null,
    libelle: req.body.libelle || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Classse.classseSelectByInModel(obj)
    .then(classse => res.status(200).json(classse))
    .catch(error => res.status(400).json({ error }))
}

function selectAllClassse(req, res, next) {

    Classse.selectAllClassse(req)
    .then(classse => res.status(200).json(classse))
    .catch(error => res.status(400).json(error))
}

function selectClassseById(req, res, next) {
  const id = req.params.id
  Classse.selectClassseById(id)
    .then(classse => res.status(200).json(classse))
    .catch(error => res.status(400).json(error))
}


function addClassse(req, res, next) {
  const classseObj = {
    ecoleId: req.body.ecoleId,
    niveau: req.body.niveau,
    estActif: 1,
  }
  
  Classse.classseSelectByInModel(classseObj)
    .then(classse => {
      if (classse.length == 0) {
        const classseObj = {
          ecoleId: req.body.ecoleId,
          enseignantId: req.body.enseignantId,
          niveau: req.body.niveau,
          etape: req.body.etape,
          libelle: req.body.libelle,
          creationUserId: req.body.creationUserId,
        }

        Classse.addClassseInModel(classseObj)
        .then(data => res.status(201).json(data))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée classse_insert" }));
   
      }
      else {
        res.status(500).json({ error: "Cette classse existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée classse_selectBy" }))
}


function updateClassse(req, res, next) {
  const classseObj = {
    ecoleId: req.body.ecoleId,
    enseignantId: req.body.enseignantId,
    estActif: 1,
  }

  //verifie si l'utilisateur existe en base
  Classse.classseSelectByInModel(classseObj)
    .then(classse => {
      if ((classse.length == 0) || (classse[0].id == req.body.id)) {
        const classseObj = {
          ecoleId: req.body.ecoleId,
          niveau: req.body.niveau,
          estActif: 1,
        }
      
        //verifie si l'utilisateur existe en base
        Classse.classseSelectByInModel(classseObj)
          .then(classse => {
            if ((classse.length == 0) || (classse[0].id == req.body.id)) {
              const classseObj = {
                id: req.body.id,
                ecoleId: req.body.ecoleId,
                enseignantId: req.body.enseignantId,
                niveau: req.body.niveau,
                etape: req.body.etape,
                libelle: req.body.libelle,
                modifUserId: req.body.modifUserId,
                modifDate: req.body.modifDate,
              }
    
            Classse.updateClassseInModel(classseObj)
            .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
            .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée classse_update" }));
        
              }
            else {
              res.status(500).json({ error: "cette classe existe déjà(niveau)" })
            }
          })
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée classse_selectBy" }))
        }
      else {
        res.status(500).json({ error: "Cet enseignant a déjà une classe" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée classse_selectBy" }))
}

function disableClasse(req, res, next){
  const obj={
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }
  Classse.disableClassseInModel(obj)
  .then(()=> res.status(200).json({succes: "La suppression a reussi"}))
  .catch(error => res.status(400).json(error))

}
//supression logique d'un axe
function deleteClassse(req, res, next) {
  Classse.deleteClassseInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  classseSelectBy,
  selectAllClassse,
  selectClassseById,
  addClassse,
  disableClasse,
  updateClassse,
  deleteClassse
}