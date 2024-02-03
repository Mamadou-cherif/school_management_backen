const Payement = require("../models/payement")

 function payementSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    typePayements: req.body.typePayements || null,
    tranche: req.body.tranche || null,
    mois: req.body.mois || null,
    prix: req.body.prix || null,
    datePayement: req.body.datePayement || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Payement.payementSelectByInModel(obj)
    .then(payement => res.status(200).json(payement))
    .catch(error => res.status(400).json({ error }))
}


function getStorySaleByEleve(req, res, next) {
  const obj= {
    eleveId: req.body.eleveId,
    mois: req.body.mois,
  }
    Payement.getStorySaleByEleve(obj)
    .then(payement => res.status(200).json(payement))
    .catch(error => res.status(400).json(error))
  }
function getElevePasPaye(req, res, next) {
  const obj= {
    classeId: req.body.classeId,
    mois: req.body.mois,
  }
    Payement.getElevePasPaye(obj)
    .then(payement => res.status(200).json(payement))
    .catch(error => res.status(400).json(error))
  }
function getStudentSituationByClasseId(req, res, next) {
const obj= {
  classeId: req.body.classeId,
  mois: req.body.mois,
}
  Payement.getStudentSituationByClasseId(obj)
  .then(payement => res.status(200).json(payement))
  .catch(error => res.status(400).json(error))
}
function selectAllPayement(req, res, next) {

    Payement.selectAllPayement(req)
    .then(payement => res.status(200).json(payement))
    .catch(error => res.status(400).json(error))
}

function selectPayementById(req, res, next) {
  const id = req.params.id
  Payement.selectPayementById(id)
    .then(payement => res.status(200).json(payement))
    .catch(error => res.status(400).json(error))
}


async function addPayement(req, res, next) {
  let tabFromFront = req.body

  if(req.body.typeAjout == "ajoutPourMois"){
    try {
      const payementObj = {
        eleveId: req.body.eleveId,
        trancheId: req.body.trancheId,
        prestationId: req.body.prestationId,
        mois: req.body.mois,
        prix: req.body.prix,
        datePayement: req.body.datePayement,
        typePayements: req.body.typePayements,
        creationUserId: req.body.creationUserId,
    }
      let request =  Payement.addPayementInModel(payementObj)

      if(request){
          res.status(200).json({succes: "L'ajout a réussi"})
      }
      else{
        res.status(400).json({error: "L'ajout a échoué"})
      }
    } 
    catch (error) {
      res.status(400).json(error)
    }
    
    
    }
    else {
      try {
        for (let index = 0; index < tabFromFront.length; index++) {
          const payementObj = {
            eleveId: tabFromFront[index].eleveId,
            trancheId: tabFromFront[index].trancheId,
            prestationId: tabFromFront[index].prestationId,
            mois: tabFromFront[index].mois,
            prix: tabFromFront[index].prix,
            datePayement: tabFromFront[index].datePayement,
            typePayements: tabFromFront[index].typePayements,
            creationUserId: tabFromFront[index].creationUserId,
        }
         let request =  Payement.addPayementInModel(payementObj)
        if(request){
           res.status(200).json({succes: "L'ajout a réussi"})
        }
        else{
          res.status(400).json({error: "L'ajout a échoué"})
        }
      }
      } catch (error) {
        
      }
    }
  }


function updatePayement(req, res, next) {
  const payementObj = {
    id: req.body.id,
    typePayements: req.body.typePayements,
    tranche: req.body.tranche,
    mois: req.body.mois,
    prix: req.body.prix,
    datePayement: req.body.datePayement,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

Payement.updatePayementInModel(payementObj)
.then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée payement_update" }));

  }


//supression logique d'un axe
function deletePayement(req, res, next) {
  Payement.deletePayementInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  payementSelectBy,
  getStudentSituationByClasseId,
  getStorySaleByEleve,
  getElevePasPaye,
  selectAllPayement,
  selectPayementById,
  addPayement,
  updatePayement,
  deletePayement
}