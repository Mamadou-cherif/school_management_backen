const QtePrevisionnelle = require("../models/qteprevisionnelle")

 
function addQtePrevisionnelle(req, res,next){
    const qteprevisonnelleObj={
        activiteId: req.body.activiteId,
        papbId: req.body.papbId,
        paabId: req.body.paabId,
        estActif:1
    } 
    QtePrevisionnelle.qteprevisionnelleSelectByInModel(qteprevisonnelleObj)
          .then(qteprevisionnelle=> {
                if(qteprevisionnelle.length==0){
                    const qteprevisionnelleObj={
                        activiteId: req.body.activiteId,
                        papbId: req.body.papbId || null,
                        paabId: req.body.paabId || null,
                        qtePrevisionnelle: req.body.qtePrevisionnelle,
                        montantPrevisionnel: req.body.montantPrevisionnel,
                        deviseId: req.body.deviseId,
                        observations: req.body.observations,
                        creationUserId: req.body.creationUserId,
                        
                    }
                    
                        QtePrevisionnelle.addQtePrevisionnelleInModel(qteprevisionnelleObj)
                            .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
                }
                else
                   {
                     res.status(500).json({error: "duplicata du papb pour cette activité"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
    
    
  }



function qteprevisionnelleSelectBy(req, res, next){
    const qteprevisionnelleObj={
        id: req.body.id || null,
        activiteId: req.body.activiteId || null,
        papbId: req.body.papbId || null,
        paabId: req.body.paabId|| null,
        qtePrevisionnelle: req.body.qtePrevisionnelle|| null,
        montantPrevisionnel: req.body.montantPrevisionnel|| null,
        deviseId: req.body.deviseId|| null,
        observations: req.body.observations,
        estActif: 1,
        creationDate: req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
        debut: req.body.debut || null,
        fin: req.body.fin || null
}

QtePrevisionnelle.qteprevisionnelleSelectByInModel(qteprevisionnelleObj)
    .then(qteprevisionnelle=> res.status(200).json(qteprevisionnelle))
    .catch(error=> res.status(400).json(error))

}
 
function updateQtePrevisionnelle(req,res, next){
    const qteprevisonnelleObj={
        activiteId: req.body.activiteId,
        papbId: req.body.papbId || null,
        paabId: req.body.paabId || null,
        estActif:1
    }
    QtePrevisionnelle.qteprevisionnelleSelectByInModel(qteprevisonnelleObj)
          .then(qteprevisionnelle=> {
                if((qteprevisionnelle.length==0) || (qteprevisionnelle[0].id == req.body.id)){
                    const qteprevisionnelleObj={
                        id: req.body.id,
                        activiteId: req.body.activiteId,
                        papbId: req.body.papbId,
                        paabId: req.body.paabId,
                        qtePrevisionnelle: req.body.qtePrevisionnelle,
                        montantPrevisionnel: req.body.montantPrevisionnel,
                        deviseId: req.body.deviseId,
                        observations: req.body.observations,
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                    }
                    
                        QtePrevisionnelle.updateQtePrevisionnelleInModel(qteprevisionnelleObj)
                            .then(()=> res.status(200).json({succes: "Modification effectuée avec succès"}))
                            .catch(()=> res.status(400).json({error: "Erreur de la procédure stocké d'ajout"}));
                    
                }
                else
                   {
                     res.status(500).json({error: "duplicata du papb pour cette activité"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))

 
}

//supression logique d'une qteprevisionnelle
function disableQtePrevisionnelle(req, res, next) {
 const qteprevisionnelleObj={
        id: req.body.id,
        modifDate: req.body.modifDate,
        modifUserId: req.body.modifUserId,
}
    QtePrevisionnelle.disableQtePrevisionnelleInModel(qteprevisionnelleObj)
        .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}

function selectPapb(req, res, next){
    QtePrevisionnelle.selectPapbInModel()
    .then(papb => res.status(200).json(papb))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));

}

function selectPaabByPapbId(req, res, next){
    const qteprevisionnelleObj={
        estActif:1,
        papbId: req.body.papbId
}
    QtePrevisionnelle.selectPaabByPapbIdInModel(qteprevisionnelleObj)
    .then(papb => res.status(200).json(papb))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));

}

function selectActiviteByPaabId(req, res, next){
    const qteprevisionnelleObj={
        estActif:1,
        paabId: req.body.paabId
}
    QtePrevisionnelle.selectActiviteByPaabIdInModel(qteprevisionnelleObj)
    .then(activite => res.status(200).json(activite))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}

function selectPaabByPapbIdAndActiviteId(req, res, next){
     const qteprevisionnelleObj={
         activiteId: req.body.activiteId,
         papbId: req.body.papbId,
         estActif:1,
     }
     QtePrevisionnelle.selectPaabByPapbIdAndActiviteId(qteprevisionnelleObj)
        .then(activite => res.status(200).json(activite))
        .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout"}));
}


function selectStatsResultatActivitePapb(req, res, next){
    
    QtePrevisionnelle.selectStatsResultatActivitePapb()
       .then(activite => res.status(200).json(activite))
       .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout"}));
}
function slectActiviteInQtePrevByStrategieId(req, res, next){
    const qteprevisionnelleObj={
        strategieId: req.body.strategieId,
        papbId: req.body.papbId,
        estActif:1,
    }

    console.log(qteprevisionnelleObj)
    QtePrevisionnelle.slectActiviteInQtePrevByStrategieId(qteprevisionnelleObj)
       .then(activite => res.status(200).json(activite))
       .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout"}));
}

function getLineByActiviteIdAndPapbId(req, res, next){
    const qteprevisionnelleObj={
        activiteId: req.body.activiteId,
        paabId: req.body.paabId,
        estActif:1,
    }
    QtePrevisionnelle.getLineByActiviteIdAndPapbIdInModel(qteprevisionnelleObj)
       .then(activite => res.status(200).json(activite))
       .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout"}));
}

function deleteQtePrevisionnelle(req, res, next) {
    const id = req.params.id
    QtePrevisionnelle.deleteQtePrevisionnelleInModel(id)
        .then(() => res.status(200).json({succes: "suppression bien réussie"}))
        .catch(() => res.status(400).json({error: "cet élément est lié à d'autres élements"}))
}






function getAsingleQtePrevisionnelle(req, res, next) {
    const id = req.params.id
    QtePrevisionnelle.getQtePrevisionnelleByIdInModel(id)
        .then(qteprevisionnelle => res.status(200).json(qteprevisionnelle))
        .catch(error => res.status(400).json(error))
}


function getAllQtePrevisionnelle(req, res, next) {
    QtePrevisionnelle.getAllQtePrevisionnelleInModel()
        .then(qteprevisionnelle => res.status(200).json(qteprevisionnelle))
        .catch(error => res.status(400).json(error))
    }
module.exports = {
    slectActiviteInQtePrevByStrategieId,
    selectStatsResultatActivitePapb,
    disableQtePrevisionnelle,
    getLineByActiviteIdAndPapbId,
    selectPaabByPapbIdAndActiviteId,
    selectPapb,
    selectPaabByPapbId,
    selectActiviteByPaabId,
    addQtePrevisionnelle,
    updateQtePrevisionnelle,
    getAsingleQtePrevisionnelle,
    getAllQtePrevisionnelle,
    deleteQtePrevisionnelle,
    qteprevisionnelleSelectBy
}