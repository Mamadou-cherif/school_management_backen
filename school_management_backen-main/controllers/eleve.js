const Eleve = require("../models/eleve")

function eleveSelectBy(req, res, next) {
  const obj={
    id: req.body.id || null,
    sessionId: req.body.sessionId || null,
    classeId: req.body.classeId || null,
    matricule: req.body.matricule || null,
    nom: req.body.nom || null,
    prenoms: req.body.prenoms || null,
    numeroTuteur1: req.body.numeroTuteur1 || null,
    numeroTuteur2: req.body.numeroTuteur2 || null,
    numeroTuteur4: req.body.numeroTuteur4 || null,
    statut: req.body.statut || null,
    estActif: req.body.estActif || null,
    creationDate:null,
    creationUserId:null,
    modifDate:null,
    modifUserId:null
}
Eleve.eleveSelectByInModel(obj)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json({ error }))
}

function selectAllEleve(req, res, next) {

    Eleve.selectAllEleve(req)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}

function getEleveByMatriculeAndEcoleId(req, res, next) {
  const obj={
    ecoleId: req.body.ecoleId,
    matricule: req.body.matricule,
  }
  Eleve.getEleveByMatriculeAndEcoleId(obj)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}

function getEleveOfficialClassementByTicket(req, res, next) {
  const obj={
    classeId: req.body.classeId,
    ticketId: req.body.ticketId,
  }
  Eleve.getEleveOfficialClassementByTicket(obj)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}

function getEleveOfficialClassement(req, res, next) {
  const obj={
    classeId: req.body.classeId,
    sessionId: req.body.sessionId,
  }
  Eleve.getEleveOfficialClassement(obj)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}

function makeClassement(req, res, next) {
  const obj={
    ticketId: req.body.ticketId,
    classeId: req.body.classeId,
  }
  Eleve.makeClassement(obj)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}

function makeSecondaryClassement(req, res, next) {
  const obj={
    ticketId: req.body.ticketId,
    classeId: req.body.classeId,
  }
  Eleve.makeSecondaryClassement(obj)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}

function selectEleveById(req, res, next) {
  const id = req.params.id
  Eleve.selectEleveById(id)
    .then(eleve => res.status(200).json(eleve))
    .catch(error => res.status(400).json(error))
}


async function  addEleve(req, res, next) {
  // Le tableau qui revient req.body est un tableau
  let tabEleve= req.body

  for (let index = 0; index < tabEleve.length; index++) {
    let obj={
      sessionId: req.body.sessionId,
      classeId: tabEleve[0].classeId,
    }
    let eleve = await Eleve.eleveSelectByInModel(obj)
    let taille = eleve.length

    let matricule = generateMatriculeByPrenomsAndNom(tabEleve[index].prenoms +" " + tabEleve[index].nom, taille)
    let eleveObj = {

              classeId: tabEleve[index].classeId,
              sessionId: tabEleve[index].sessionId,
              matricule: matricule,
              nom: tabEleve[index].nom,
              prenoms: tabEleve[index].prenoms,
              numeroTuteur1: tabEleve[index].numeroTuteur1,
              numeroTuteur2: tabEleve[index].numeroTuteur2,
              numeroTuteur4: tabEleve[index].numeroTuteur4,
              statut: tabEleve[index].statut,
              creationUserId: tabEleve[index].creationUserId,
          }
          try{
          await Eleve.addEleveInModel(eleveObj)
          }
         catch(e){
          return res.status(400).json({error: "error"})

         }
          
  }
   return res.status(200).json({succes: "succes"})
  

  

  // const eleveObj = {
  //   matricule: req.body.matricule,
  //   estActif: 1,
  // }

  // Eleve.eleveSelectByInModel(eleveObj)
  //   .then(eleve => {
  //     if (eleve.length == 0) {
  //       const eleveObj = {
  //           classeId: req.body.classeId,
  //           matricule: req.body.matricule,
  //           nom: req.body.nom,
  //           prenoms: req.body.prenoms,
  //           numeroTuteur1: req.body.numeroTuteur1,
  //           numeroTuteur2: req.body.numeroTuteur2,
  //           numeroTuteur4: req.body.numeroTuteur4,
  //           statut: req.body.statut,
  //           creationUserId: req.body.creationUserId,
  //       }

  //       Eleve.addEleveInModel(eleveObj)
  //       .then(data => res.status(201).json(data))
  //       .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée eleve_insert" }));
   
  //     }
  //     else {
  //       res.status(500).json({ error: "Cette eleve existe déjà" })
  //     }
  //   })
  //   .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée eleve_selectBy" }))

  }
  function  generateMatriculeByPrenomsAndNom(nomComplet, taille){
    // Mettre tout le nom en Majuscule, enlever les blancs du debut et de la fin
    let matricule= ''
    let b = nomComplet.trimStart().trimEnd().toUpperCase()

    let tabPartsOfNomComplet= b.split(' ')
    for (let index = 0; index < tabPartsOfNomComplet.length; index++) {
       matricule += tabPartsOfNomComplet[index].charAt(0)
    }
    if(taille < 10){
      return matricule + '000'+ taille
    }
    else if(taille >= 10 && taille <= 99){
      return matricule + '00'+ taille
    }
    else if(taille >= 100 && taille <= 999){
      return matricule + '0'+ taille
    }
    return matricule
   }

   function disableEleve(req, res, next){
    const obj={
      id: req.body.id,
      modifUserId: req.body.modifUserId,
      modifDate: req.body.modifDate,
    }
    Eleve.disableEleveInModel(obj)
    .then(()=> res.status(200).json({succes: "La suppression a reussi"}))
    .catch(error => res.status(400).json(error))
  
  }
function updateEleve(req, res, next) {
  //verifie si l'utilisateur existe en base
        const eleveObj = {
            id: req.body.id,
            sessionId: req.body.sessionId,
            classeId: req.body.classeId,
            matricule: req.body.matricule,
            nom: req.body.nom,
            prenoms: req.body.prenoms,
            numeroTuteur1: req.body.numeroTuteur1,
            numeroTuteur2: req.body.numeroTuteur2,
            numeroTuteur4: req.body.numeroTuteur4,
            statut: req.body.statut,
            modifUserId: req.body.modifUserId,
            modifDate: req.body.modifDate,
          }
        Eleve.updateEleveInModel(eleveObj)
        .then(() => res.status(201).json({ succes: "Modification effectuée avec succès" }))
        .catch(() => res.status(400).json({ error: "Erreur de la procedure stockée eleve_update" }));
    
     
}


//supression logique d'un axe
function deleteEleve(req, res, next) {
  Eleve.deleteEleveInModel(req.params.id)
    .then(() => res.status(201).json({ succes: "Suppression effectuée avec succès" }))
    .catch(() => res.status(400).json({ error: "Impossible de supprimer cet élément car il est lié à une autre table" }));
}


module.exports = {
  eleveSelectBy,
  selectAllEleve,
  getEleveByMatriculeAndEcoleId,
  selectEleveById,
  addEleve,
  makeClassement,
  makeSecondaryClassement,
  disableEleve,
  updateEleve,
  deleteEleve,
  getEleveOfficialClassement,
  getEleveOfficialClassementByTicket
}