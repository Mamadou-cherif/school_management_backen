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


function getPersonnelAffectedToEquipe(req, res, next) {
  const equipespersonnelObj = {
    siteId: req.body.siteId,
    equipeId: req.body.equipeId
  }

  EquipesPersonnel.getPersonnelAffectedToEquipe(equipespersonnelObj)
  .then(personnel => res.status(201).json(personnel))
  .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipespersonnel_insert" }));


}
function addEquipesPersonnel(req, res, next) {
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


function updateEquipesPersonnel(req, res, next) {
 
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
  .then(() => res.status(201).json({succes: "la modification a reussi avec succès"}))
  .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée equipespersonnel_insert" }));

  }


function deleteEquipesPersonnel(req, res, next) {
  EquipesPersonnel.deleteEquipesPersonnelInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  equipespersonnelSelectBy,
  getPersonnelAffectedToEquipe,
  selectAllEquipesPersonnel,
  selectByIdEquipesPersonnel,
  addEquipesPersonnel,
  updateEquipesPersonnel,
  deleteEquipesPersonnel
}