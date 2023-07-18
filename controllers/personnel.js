const Personnel = require("../models/personnel")

function personnelSelectBy(req, res, next) {
    const obj={
        id: req.body.id || null,
        libelle: req.body.libelle || null,
        nom: req.body.nom || null,
        prenoms: req.body.prenoms || null,
        telephone: req.body.telephone || null,
        email: req.body.email || null,
        contratId: req.body.contratId || null,
        flotteId: req.body.flotteId || null,
        typeFonctionId: req.body.typeFonctionId || null,
        statut: req.body.statut || null,
        estActif:1,
        creationDate : req.body.creationDate || null,
        creationUserId: req.body.creationUserId || null,
        modifDate: req.body.modifDate || null,
        modifUserId: req.body.modifUserId || null,
    }
Personnel.personnelSelectByInModel(obj)
    .then(personnel => res.status(200).json(personnel))
    .catch(error => res.status(400).json({ error }))
}



function getChauffeurNotAffectedToCamionToASite(req, res, next) {
  const obj={
    siteId: req.body.siteId
  }
    Personnel.getChauffeurNotAffectedToCamionToASite(obj)
    .then(personnel => res.status(200).json(personnel))
    .catch(error => res.status(400).json(error))
  }

function getChauffeurNotAffectedToCamionToAFlotte(req, res, next) {
  const obj={
    flotteId: req.body.flotteId
  }
    Personnel.getChauffeurNotAffectedToCamionToAFlotte(obj)
    .then(personnel => res.status(200).json(personnel))
    .catch(error => res.status(400).json(error))
  }

function getChauffeurByFlotteId(req, res, next) {
const obj={
  flotteId: req.body.flotteId
}
  Personnel.getChauffeurByFlotteId(obj)
  .then(personnel => res.status(200).json(personnel))
  .catch(error => res.status(400).json(error))
}

function selectAllPersonnel(req, res, next) {

    Personnel.selectAllPersonnelInModel(req)
    .then(personnel => res.status(200).json(personnel))
    .catch(error => res.status(400).json(error))
}

function selectByIdPersonnel(req, res, next) {
  const id = req.params.id
  Personnel.selectByIdPersonnelInModel(id)
    .then(personnel => res.status(200).json(personnel))
    .catch(error => res.status(400).json(error))
}


function addPersonnel(req, res, next) {
    const objTelephone={
        telephone: req.body.telephone,
        flotteId: req.body.flotteId,
        estActif:1,
    }
  Personnel.personnelSelectByInModel(objTelephone)
    .then(personnel => {
      if (personnel.length == 0) {
        const objEmail={
            email: req.body.email,
            flotteId: req.body.flotteId,
            estActif:1,
        }
        Personnel.personnelSelectByInModel(objEmail)
        .then(personnel1 => {
          if (personnel1.length == 0 || personnel1[0].email=="") {
            const personnelObj = {
                libelle: req.body.libelle,
                nom: req.body.nom,
                prenoms: req.body.prenoms,
                telephone: req.body.telephone,
                email: req.body.email,
                contratId: req.body.contratId,
                flotteId: req.body.flotteId,
                typeFonctionId: req.body.typeFonctionId,
                statut: req.body.statut,
                creationUserId: req.body.creationUserId,
              }
            
              Personnel.addPersonnelInModel(personnelObj)
              .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
              .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée personnel_insert" }));
          }
          else {
            res.status(500).json({ error: "cette adresse mail existe déjà" })
          }
        })
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée personnel_selectBy" }))
      }
      else {
        res.status(500).json({ error: "Cette personnel existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée personnel_selectBy" }))
}


function updatePersonnel(req, res, next) {
  const personnelObj = {
    flotteId: req.body.flotteId,
    telephone: req.body.telephone,
    estActif:1,
  }

  //verifie si le numero de téléphone existe en base
  Personnel.personnelSelectByInModel(personnelObj)
    .then(personnel => {
        
      if ((personnel.length == 0) || (personnel[0].id == req.body.id)) {
            const objEmail={
                flotteId: req.body.flotteId,
                email: req.body.email,
                estActif:1,
            }
            Personnel.personnelSelectByInModel(objEmail)
            .then(personnel1 => {
              if (personnel1.length == 0 || (personnel1[0].id == req.body.id)) {
                const personnelObj = {
                    id: req.body.id,
                    libelle: req.body.libelle,
                    nom: req.body.nom,
                    prenoms: req.body.prenoms,
                    telephone: req.body.telephone,
                    email: req.body.email,
                    contratId: req.body.contratId,
                    flotteId: req.body.flotteId,
                    typeFonctionId: req.body.typeFonctionId,
                    statut: req.body.statut,
                    modifUserId: req.body.modifUserId,
                    modifDate: req.body.modifDate,
                  }
                
                  Personnel.updatePersonnelInModel(personnelObj)
                  .then(() => res.status(201).json({succes: "ajout reussi avec succès"}))
                  .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée personnel_insert" }));
              }
              else {
                res.status(500).json({ error: "Cette adresse mail existe déjà pour un autre personnel" })
              }
            })
            .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée personnel_selectBy" }))
          }
          else {
            res.status(500).json({ error: "Ce numéro de téléphone existe déjà pour un autre utilisateur" })
          }
    
      
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée personnel_selectBy" }))
}


//supression logique d'un axe
function deletePersonnel(req, res, next) {
  Personnel.deletePersonnelInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  personnelSelectBy,
  getChauffeurNotAffectedToCamionToASite,
  getChauffeurNotAffectedToCamionToAFlotte,
  getChauffeurByFlotteId,
  selectAllPersonnel,
  selectByIdPersonnel,
  addPersonnel,
  updatePersonnel,
  deletePersonnel
}