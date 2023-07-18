const EquipesPersonnel = require("../models/equipepersonnel")

function equipespersonnelSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        equipeId: req.body.equipeId || null,
        personnelId: req.body.personnelId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
EquipesPersonnel.equipespersonnelSelectByInModel(obj)
    .then(equipespersonnel => res.status(200).json(equipespersonnel))
    .catch(error => res.status(400).json({ error }))
}




function selectAllEquipesPersonnel(req, res, next) {

    EquipesPersonnel.selectAllEquipesPersonnelInModel(req)
    .then(equipespersonnel => res.status(200).json(equipespersonnel))
    .catch(error => res.status(400).json(error))
}

function selectByIdEquipesPersonnel(req, res, next) {
  const id = req.params.id
  EquipesPersonnel.selectByIdEquipesPersonnelInModel(id)
    .then(equipespersonnel => res.status(200).json(equipespersonnel))
    .catch(error => res.status(400).json(error))
}


function addEquipesPersonnel(req, res, next) {
    const obj={
      equipeId: req.body.equipeId,
      personnelId: req.body.personnelId,
        estActif:1,
    }
  EquipesPersonnel.equipespersonnelSelectByInModel(obj)
    .then(equipespersonnel => {
      if (equipespersonnel.length == 0) {
        const equipespersonnelObj = {
          equipeId: req.body.equipeId,
          personnelId: req.body.personnelId,
          debut: req.body.debut,
          fin: req.body.fin,
          creationUserId: req.body.creationUserId,
        }
      
        EquipesPersonnel.addEquipesPersonnelInModel(equipespersonnelObj)
        .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipespersonnel_insert" }));
      
      }
      else {
        res.status(500).json({ error: "ce personnel existe déjà dans cette équipe" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipespersonnel_selectBy" }))

  }


function updateEquipesPersonnel(req, res, next) {
  const obj={
    equipeId: req.body.equipeId,
    personnelId: req.body.personnelId,
    estActif:1,
}
EquipesPersonnel.equipespersonnelSelectByInModel(obj)
.then(equipespersonnel => {
  if (equipespersonnel.length == 0) {

    const equipespersonnelObj = {
      id: req.body.id,
      equipeId: req.body.equipeId,
      personnelId: req.body.personnelId,
      debut: req.body.debut,
      fin: req.body.fin,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
  
    EquipesPersonnel.updateEquipesPersonnelInModel(equipespersonnelObj)
    .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipespersonnel_insert" }));
  
  }
  else {
    res.status(500).json({ error: "ce personnel existe déjà dans cette équipe" })
  }
})
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipespersonnel_selectBy" }))


  }


function deleteEquipesPersonnel(req, res, next) {
  EquipesPersonnel.deleteEquipesPersonnelInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  equipespersonnelSelectBy,
  selectAllEquipesPersonnel,
  selectByIdEquipesPersonnel,
  addEquipesPersonnel,
  updateEquipesPersonnel,
  deleteEquipesPersonnel
}