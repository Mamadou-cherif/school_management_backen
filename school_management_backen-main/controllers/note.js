const Note = require("../models/note")

function noteSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    ticketId: req.body.ticketId || null,
    eleveId: req.body.eleveId || null,
    matiereId: req.body.matiereId || null,
    valeur: req.body.valeur || null,
    semestre: req.body.semestre || null,
    mois: req.body.mois || null,
    isOral: req.body.isOral || null,
    isEcrit: req.body.isEcrit || null,
    observations: req.body.observations || null,
    estActif:1,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Note.noteSelectByInModel(obj)
    .then(note => res.status(200).json(note))
    .catch(error => res.status(400).json({ error }))
}

function selectAllNote(req, res, next) {

    Note.selectAllNote(req)
    .then(note => res.status(200).json(note))
    .catch(error => res.status(400).json(error))
}



function selectNoteById(req, res, next) {
  const id = req.params.id
  Note.selectNoteById(id)
    .then(note => res.status(200).json(note))
    .catch(error => res.status(400).json(error))
}

function calculeMoyenneParClasseEtSession(req, res, next) {
  const obj={
    classeId : req.body.classeId,
    sessionId : req.body.sessionId
  }
  Note.calculeMoyenneParClasseEtSession(obj)
    .then(note => res.status(200).json(note))
    .catch(error => res.status(400).json(error))
}

async function addNote(req, res, next) {
  let tabNoteToAdd= req.body
 // i est le compteur des note à ajouter
 if(!tabNoteToAdd[0].estSecondaire){

   for (let i = 0; i < req.body.length; i++) {
    // parcourir le tableau des note 
     for (let j = 0; j < req.body[i].note.length; j++) {
       const noteObj = {
         ticketId: req.body[i].ticketId,
         eleveId: req.body[i].eleveId,
         matiereId: req.body[i].note[j].matId,
         valeur: req.body[i].note[j].note,
         semestre: req.body[i].semestre,
         mois: req.body[i].mois,
         isOral: req.body[i].isOral || "",
         isEcrit: req.body[i].isEcrit  || "",
         observations: req.body[i].observations || "",
         creationUserId: req.body[i].creationUserId,
       }

       const objNote={
         ticketId: req.body[i].ticketId,
         eleveId: req.body[i].eleveId,
         matiereId: req.body[i].note[j].matId,
         estActif:1
       }
       // Verifier si cette note a été dejà ajouté pour ce ticket et pour cet élève et pour cette matière.
       let existNote=await Note.noteSelectByInModel(objNote)

       if(existNote.length == 0){
         Note.addNoteInModel(noteObj)
           .then(data => {})
           .catch(() => {});
       }
     }
     
     
     
   }
 }
 else{
  for (let i = 0; i < req.body.length; i++) {
    const noteObj = {
      ticketId: req.body[i].ticketId,
      eleveId: req.body[i].eleveId,
      matiereId: req.body[i].matiereId,
      semestre: req.body[i].semestre || "",
      mois: req.body[i].mois || "" ,
      isOral: req.body[i].note.orale || null,
      isEcrit: req.body[i].note.ecrite  || null,
      observations: req.body[i].observations || "",
      creationUserId: req.body[i].creationUserId,
    }
    let existNote=await Note.noteSelectByInModel(noteObj)
      
      if(existNote.length == 0){
        Note.addNoteInModel(noteObj)
          .then(data => {})
          .catch(() => {});
      }
  }
 }

}


function updateNote(req, res, next) {
  const noteObj = {
    id: req.body.id,
    ticketId: req.body.ticketId,
    eleveId: req.body.eleveId,
    matiereId: req.body.matiereId,
    valeur: req.body.valeur,
    semestre: req.body.semestre,
    mois: req.body.mois,
    isOral: req.body.isOral,
    isEcrit: req.body.isEcrit,
    observations: req.body.observations,
    modifUserId: req.body.modifUserId,
    modifDate: req.body.modifDate,
  }

Note.updateNoteInModel(noteObj)
.then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
.catch(() => res.status(400).json({ error: "Erreur de la procedure stockée note_update" }));

  }


//supression logique d'un axe
function deleteNote(req, res, next) {
  Note.deleteNoteInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  noteSelectBy,
  calculeMoyenneParClasseEtSession,
  selectAllNote,
  selectNoteById,
  addNote,
  updateNote,
  deleteNote
}