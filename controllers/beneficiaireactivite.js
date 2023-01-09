const BeneficiaireActivite= require("../models/beneficiaireactivite")

function addBeneficiaireActivite(req, res,next){
    const benefactivite={
        beneficiaireId: req.body.beneficiaireId,
        activiteId: req.body.activiteId,
        estActif: 1,
    }
       
     BeneficiaireActivite.benefactiviteSelectByInModel(benefactivite)
          .then(benefactivite=> {
                if(benefactivite.length==0){
                    
                    const benefactiviteObj1={
                        activiteId: req.body.activiteId,
                        beneficiaireId: req.body.beneficiaireId, 
                        creationUserId: req.body.creationUserId,
                       }
                    BeneficiaireActivite.addBeneficiaireActiviteInModel(benefactiviteObj1)
                        .then(()=> res.status(201).json({succes: "la création a reussi"}))
                        .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
              
                }
                else
                   {
                     res.status(500).json({error: "ce beneficiaire existe déjà pour cette activite."})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}

//supression logique d'un benefactivite
function disableBeneficiaireActivite(req, res, next){
    const benifActiviteObj={
        id: req.body.id,
        modifUserId: req.body.modifUserId,
        modifDate: req.body.modifDate
    }


    BeneficiaireActivite.disableBeneficiaireActiviteInModel(benifActiviteObj)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function benefactiviteSelectBy(req, res, next){
    const obj={
        id: req.body.id || null,
        activiteId: req.body.activiteId || null,
        beneficiaireId: req.body.beneficiaireId || null,                
        modifDate: req.body.modifDate || null,
        estActif: 1,
        modifUserId: req.body.modifUserId || null,
        debutDonnees: req.body.debutDonnees || null,
        finDonnees: req.body.finDonnees || null,
    }

    BeneficiaireActivite.benefactiviteSelectByInModel(obj)
        .then(benefactivite=> res.status(200).json(benefactivite))
        .catch(error=> res.status(400).json(error))
}

function updateBeneficiaireActivite(req,res, next){
    const benefactiviteObj={
        activiteId: req.body.activiteId,
        beneficiaireId: req.body.beneficiaireId,
        estActif: 1,
    }
              
    BeneficiaireActivite.benefactiviteSelectByInModel(benefactiviteObj)
         .then(benefactivite=> {
               if((benefactivite.length==0) || (benefactivite[0].id== req.body.id)){
                const benefactiviteObj1={
                    id: req.body.id,
                    activiteId: req.body.activiteId,
                    beneficiaireId: req.body.beneficiaireId,                
                    modifDate: req.body.modifDate,
                    modifUserId: req.body.modifUserId,
                   }
            
                    BeneficiaireActivite.updateBeneficiaireActiviteInModel(benefactiviteObj1)
                            .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                            .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                   
                }
               else
                  {
                    res.status(500).json({error: "ce bénéficiaire existe déjà pour cette activité."})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleBeneficiaireActivite(req, res, next){
    const id= req.params.id
    BeneficiaireActivite.getBeneficiaireActiviteByIdInModel(id)
        .then(benefactivite=> res.status(200).json(benefactivite))
        .catch(error=> res.status(400).json(error))
}


function getAllBeneficiaireActivites(req,res, next){
    const benefactivite={
        estActif: req.body.estActif,
        debut: req.body.debut,
        fin: req.body.fin
    }
    

     BeneficiaireActivite.getAllBeneficiaireActiviteInModel(benefactivite)
        .then(benefactivites=> res.status(200).json(benefactivites))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    benefactiviteSelectBy,
    disableBeneficiaireActivite,
    addBeneficiaireActivite,
    updateBeneficiaireActivite,
    getAsingleBeneficiaireActivite,
    getAllBeneficiaireActivites,
}