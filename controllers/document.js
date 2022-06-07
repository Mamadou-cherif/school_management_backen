const Document = require("../models/document")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())


function addDocument(req, res, next) {
  const objDocument = {
    reference: req.body.reference,
    estActif: 1
  }
  Document.documentSelectByInModel(objDocument)
    .then(document => {
      if ((document.length == 0)) {
        const objDocument = {
          axeId: req.body.axeId || null,
          programmeId: req.body.programmeId || null,
          projetId: req.body.projetId || null,
          prestataireId: req.body.prestataireId || null,
          structureId: req.body.structureId || null,
          evaluationId: req.body.evaluationId || null,
          typeDocumentId: req.body.typeDocumentId,
          reference: req.body.reference,
          debut: req.body.debut,
          fin: req.body.fin,
          copie: req.body.copie,
          renouvelerId: req.body.renouvelerId,
          observations: req.body.observations,
          creationUserId: req.body.creationUserId
        }
        Document.addDocumentInModel(objDocument)
          .then(() => res.status(201).json({ succes: "Ajout effectué avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée documents_insert" }));

      }
      else {
        res.status(500).json({ error: "Cette reference existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée documents_selectBy" }))



}

function updateDocument(req, res, next) {
  const objDocument = {
    projetId: req.body.projetId || null,
    reference: req.body.reference,
    estActif: 1
  }
  Document.documentSelectByInModel(objDocument)
    .then(document => {
      if ((document.length == 0) || (document[0].id == req.body.id)) {
        const objDocument = {
          id: req.body.id,
          axeId: req.body.axeId || null,
          programmeId: req.body.programmeId || null,
          projetId: req.body.projetId || null,
          prestataireId: req.body.prestataireId || null,
          structureId: req.body.structureId || null,
          evaluationId: req.body.evaluationId || null,
          typeDocumentId: req.body.typeDocumentId,
          reference: req.body.reference,
          debut: req.body.debut,
          fin: req.body.fin,
          copie: req.body.copie,
          renouvelerId: req.body.renouvelerId,
          observations: req.body.observations,
          modifDate: req.body.modifDate,
          modifUserId: req.body.modifUserId,
        }
        Document.updateDocumentInModel(objDocument)
          .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
          .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée documents_update" }));

      }
      else {
        res.status(500).json({ error: "Cette reference existe déjà" })
      }
    })
    .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée documents_selectBy" }))



}




function disableDocument(req, res, next) {

  const objDocument = {
    id: req.body.id,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

  Document.disableDocumentInModel(objDocument)
    .then(() => res.status(201).json({ succes: "La suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "Erreur de la procédure stocké de disable" }));

}


function selectByIdDocument(req, res, next) {
  const id = req.params.id
  Document.selectByIdDocumentInModel(id)
    .then(document => res.status(200).json(document))
    .catch(error => res.status(400).json(error))
}



function documentSelectBy(req, res, next) {

  const objDocument = {
    id: req.body.id || null,
    axeId: req.body.axeId || null,
    programmeId: req.body.programmeId || null,
    projetId: req.body.projetId || null,
    prestataireId: req.body.prestataireId || null,
    structureId: req.body.structureId || null,
    evaluationId: req.body.evaluationId || null,
    typeDocumentId: req.body.typeDocumentId || null,
    reference: req.body.reference || null,
    debut: req.body.debut || null,
    fin: req.body.fin || null,
    copie: req.body.copie || null,
    renouvelerId: req.body.renouvelerId || null,
    observations: req.body.observations || null,
    estActif: 1,
    creationDate: req.body.creationDate || null,
    creationUserId: req.body.creationUserId || null,
    modifDate: req.body.modifDate || null,
    modifUserId: req.body.modifUserId || null,
    debutDonnees: req.body.debutDonnees || null,
    finDonnees: req.body.finDonnees || null,
  }

  Document.documentSelectByInModel(objDocument)
    .then(document => res.status(200).json(document))
    .catch(error => res.status(400).json(error))
}

module.exports = {
  documentSelectBy,
  disableDocument,
  addDocument,
  updateDocument,
  selectByIdDocument,
}