const PlannifActivite= require("../models/planifactivite")

  function plannifactiviteSelectBy(req, res, next){
    const plannifactiviteObj={
      id: req.body.id ||null,
      activiteId: req.body.activiteId || null,
      tacheId: req.body.tacheId || null,
      duree: req.body.duree || null,
      debut: req.body.debut || null,
      fin: req.body.fin || null,
      userId: req.body.userId || null,
      tachePrecedenteId: req.body.tachePrecedenteId || null,
      observations: req.body.observations || null,
      estActif: 1,
      creationDate: req.body.creationDate || null,
      creationUserId: req.body.creationUserId || null,
      modifDate: req.body.modifDate || null,
      modifUserId: req.body.modifUserId || null,
      debutDonnees: req.body.debutDonnees || null,
      finDonnees: req.body.finDonnees || null,

    }

    PlannifActivite.plannifactiviteSelectByInModel(plannifactiviteObj)
    .then(plannifactivite=> res.status(200).json(plannifactivite))
    .catch(error=> res.status(400).json({error}))
    
  }

  
 
function getAllPlannifActivite(req, res, next) {

  PlannifActivite.getAllPlannifActiviteInModel(req)
    .then(plannifactivite => res.status(200).json(plannifactivite))
    .catch(error => res.status(400).json(error))
}



function selectByIdPlannifActivite(req, res, next) {
  const id = req.params.id
  PlannifActivite.plannifactiviteSelectByIdInModel(id)
    .then(plannifactivite => res.status(200).json(plannifactivite))
    .catch(error => res.status(400).json(error))
}


function addPlannifActivite(req, res, next) {

      for(let i=0; i< req.body.length; i++){
        const plannifactiviteObj={
          activiteId: req.body[i].activiteId,
          tacheId: req.body[i].tacheId,
          duree: req.body[i].duree,
          debut: req.body[i].debut,
          fin: req.body[i].fin,
          userId: req.body[i].userId,
          tachePrecedenteId: req.body[i].tachePrecedenteId,
          observations: req.body[i].observations,
          creationUserId: req.body[i].creationUserId
          }

          PlannifActivite.addPlannifActiviteInModel(plannifactiviteObj)
            .then(() =>  {next()})
            .catch(() =>  res.send(400).json(error) );
      } 
      


} 

function addSinglePlannifActivite(req, res, next) {
    const plannifactiviteObj={
      activiteId: req.body.activiteId,
      tacheId: req.body.tacheId,
      duree: req.body.duree,
      debut: req.body.debut,
      fin: req.body.fin,
      userId: req.body.userId,
      tachePrecedenteId: req.body.tachePrecedenteId,
      observations: req.body.observations,
      creationUserId: req.body.creationUserId
      }
PlannifActivite.addSinglePlannifActiviteInModel(plannifactiviteObj)
  .then(data => res.status(201).json({ data,succes: "La planification a bien réussi"}))
  .catch(() => { res.status(400).json({error: "La planification a échoué "})} );
  } 


function selectTacheNotAffectedPlannifActivite(req, res, next){
  const plannifactiviteObj={
    activiteId: req.body.activiteId,
    templateId: req.body.templateId,
    }

    PlannifActivite.selectTacheNotAffectedPlannifActivite(plannifactiviteObj)
    .then(plannifactivite => res.status(200).json(plannifactivite))
    .catch(error => res.status(400).json(error));

      
}

function updatePlannifActivite(req, res, next) {
  const plannifactiviteObj = {
    activiteId: req.body.activiteId,
    tacheId: req.body.tacheId,
    estActif: 1
  }
        PlannifActivite.plannifactiviteSelectByInModel(plannifactiviteObj)
          .then(plannifactivite => { 
            if ((plannifactivite.length == 0 )|| (plannifactivite[0].id == req.body.id)) {
                const plannifactiviteObj={
                  id: req.body.id ,
                  activiteId: req.body.activiteId,
                  tacheId: req.body.tacheId,
                  duree: req.body.duree,
                  debut: req.body.debut,
                  fin: req.body.fin,
                  userId: req.body.userId,
                  tachePrecedenteId: req.body.tachePrecedenteId,
                  observations: req.body.observations,
                  modifDate: req.body.modifDate,
                  modifUserId: req.body.modifUserId
                }

              PlannifActivite.updatePlannifActiviteInModel(plannifactiviteObj)
                .then(() => res.status(200).json({ succes: "modification effectué avec succès" }))
                .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée plannifactivites_insert" }));
            }
    })
    .catch(error => res.status(400).json(error))
}



function disablePlannifActivite(req, res, next) {

  const objPlannifActivite = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  PlannifActivite.disablePlannifActiviteInModel(objPlannifActivite)
    .then(() => res.status(200).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de disable" }));

}

function deletePlanifActivite(req, res, next) {
  PlannifActivite.deletePlannifActiviteInModel(req.params.id)
      .then(() => res.status(200).json({ succes: "Suppression effectuée avec succès" }))
      .catch(() => res.status(400).json({ error: "Suppression impossible car cette cette année cible appartient dans une autre table" }));
}

function deleteAndUpdate(req, res, next){
  const obj={
    id: req.body.id,
    tacheId: req.body.tacheId,
    tachePrecedenteId: req.body.tachePrecedenteId,
    activiteId: req.body.activiteId,
    modifUserId: req.body.modifUserId,
  }

  PlannifActivite.deleteAndUpdateInModel(obj)
    .then(()=> res.status(200).json({succes: "La suppression a bien réussi."}))
    .catch(()=> res.status(400).json({succes: "La suppression a échoué."}))
}



module.exports={  
  selectByIdPlannifActivite,
  addSinglePlannifActivite,
  selectTacheNotAffectedPlannifActivite,
  deletePlanifActivite,
  getAllPlannifActivite,
  addPlannifActivite,
  disablePlannifActivite,
  updatePlannifActivite,
  deleteAndUpdate,
  plannifactiviteSelectBy
}




 
