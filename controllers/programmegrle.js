const Programmegles = require("../models/programmegrle")


function addProgrammegles(req, res, next) {
  const programmegleObj = {
    libelle: req.body.libelle,
    estActif: 1,

  }
    Programmegles.programmeglesSelectByInModel(programmegleObj)
                        .then(programmegle=>{
                            if(programmegle.length==0){
                              const programmegleObj = {
                                libelle: req.body.libelle,
                                sigle: req.body.sigle,
                                debut: req.body.debut,
                                fin: req.body.fin,
                                observations: req.body.observations,
                                creationUserId: req.body.creationUserId,
                              }
                                Programmegles.addProgrammeglesInModel(programmegleObj)
                                .then(() => res.status(201).json({ succes: "la création a reussi" }))
                                .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
                            }
                            else{
                                return res.status(400).json({error: "duplicata du programme général"})
                            }
                        }) 
                        .catch()
}


//supression logique d'un programmegle
function disableProgrammegles(req, res, next) {
  console.log("bonjour")
  const programmegle = {
    id: req.body.id,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId,
  }
  
  Programmegles.disableProgrammeglesInModel(programmegle)
    .then(() => res.status(200).json({ succes: "la suppression a reussi" }))
    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké d'ajout" }));
}
function programmegleSelectBy(req, res, next) {
  const programmegleObj = {
    id: req.body.id,
    libelle: req.body.libelle,
    sigle: req.body.sigle,
    debut: req.body.debut,
    fin: req.body.fin,
    observations: req.body.observations,
    estActif: 1,
    creationDate: req.body.creationDate,
    creationUserId: req.body.creationUserId,
    modifDate: req.body.modifDate,
    modifUserId: req.body.modifUserId,
  }

  Programmegles.programmeglesSelectByInModel(programmegleObj)
    .then(programmegle => res.status(200).json(programmegle))
    .catch(error => res.status(400).json({ error }))

}


function updateProgrammegles(req, res, next) {
  const programmegleObj = {
    libelle: req.body.libelle,
    estActif: 1,
  }
    Programmegles.programmeglesSelectByInModel(programmegleObj)
                        .then(programmegle=>{
                            if((programmegle.length==0)  || (programmegle[0].id== req.body.id)){
                                const programmegleObj = {
                                    id: req.body.id,
                                    libelle: req.body.libelle,
                                    sigle: req.body.sigle,
                                    debut: req.body.debut,
                                    fin: req.body.fin,
                                    observations: req.body.observations,
                                    modifDate: req.body.modifDate,
                                    modifUserId: req.body.modifUserId
                                  }
                                  Programmegles.updateProgrammeglesInModel(programmegleObj)
                                    .then(() => res.status(200).json({ succes: "la modification a reussi"}))
                                    .catch(() => res.status(400).json({ error: "erreur de la procédure stocké de modification" }));
                                
                            }
                            else{
                                return res.status(400).json({error: "duplicata du programme général"})
                            }
                        }) 
                        .catch(error=> res.status(400).json(error))
}

function getAsingleProgrammegles(req, res, next) {
  const id = req.params.id
  console.log(id)
  Programmegles.getProgrammeglesByIdInModel(id)
    .then(programmegle => res.status(200).json(programmegle))
    .catch(error => res.status(400).json(error))
}


function getAllProgrammegles(req, res, next) {

  Programmegles.getAllProgrammeglesInModel()
    .then(programmegles => res.status(200).json(programmegles))
    .catch(error => res.status(400).json(error))
}

module.exports = {
  disableProgrammegles,
  addProgrammegles,
  updateProgrammegles,
  getAsingleProgrammegles,
  getAllProgrammegles,
  programmegleSelectBy
}