const Beneficiaire= require("../models/beneficiaire")

function addBeneficiaire(req, res,next){
    const beneficiaire={
        libelle: req.body.libelle,
        estActif: 1,
    }
     Beneficiaire.beneficiaireSelectBy(beneficiaire)
          .then(beneficiaire=> {
                if(beneficiaire.length==0){
                    const beneficiaire={
                        code: req.body.code,
                        estActif: 1,
                    }
                    
                    Beneficiaire.beneficiaireSelectBy(beneficiaire)
                        .then(beneficiaire=>{
                            if(beneficiaire.length==0 || req.body.code== ''){

                                const beneficiaireObj1={
                                    libelle: req.body.libelle,
                                    code: req.body.code, 
                                    estActif: 1,                 
                                    creationUserId: req.body.creationUserId,
                                   }
                                Beneficiaire.addBeneficiaireInModel(beneficiaireObj1)
                                    .then(data=> res.status(201).json({data, succes: "la création a reussi"}))
                                    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                            }
                            else{
                                return res.status(400).json({error: "Ce code de statut projet existe déjà."})
                            }
                        })
                        .catch(()=>res.status(400).json({error: "Erreur de la procédure stockée selectBy de beneficiaires."}))
                    
                }
                else
                   {
                     res.status(500).json({error: "Le libellé saisi est déjà rattaché à un autre beneficiaire"})
                   }
          })
          .catch(()=> res.status(400).json({error: "Erreur retournée par la procédure stockée de selectBy"}))
}

//supression logique d'un beneficiaire
function disableBeneficiaire(req, res, next){
    const obj={
        id: req.body.id,
        modifUserId: req.body.modifUserId,
        modifDate: req.body.modifDate
    }
    Beneficiaire.disableBeneficiaireInModel(obj)
    .then(()=> res.status(201).json({succes: "la suppression a reussi"}))
    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
}
 
function updateBeneficiaire(req,res, next){
    const beneficiaireObj={
        id: null,
        libelle: req.body.libelle,
        estActif: 1,
    }
              
    Beneficiaire.beneficiaireSelectBy(beneficiaireObj)
         .then(beneficiaire=> {
               if((beneficiaire.length==0) || (beneficiaire[0].id== req.body.id)){
                const beneficiaireObj={
                    code: req.body.code,
                    estActif: 1,
                }
                Beneficiaire.beneficiaireSelectBy(beneficiaireObj)
                .then(beneficiaire=>{
                    if((beneficiaire.length==0) || (beneficiaire[0].id== req.body.id)){
                       
                       const beneficiaireObj1={
                        id: req.body.id,
                        libelle: req.body.libelle,
                        code: req.body.code,                  
                        modifDate: req.body.modifDate,
                        modifUserId: req.body.modifUserId,
                       }
                        
                  
                           Beneficiaire.updateBeneficiaireInModel(beneficiaireObj1)
                                 .then(()=> res.status(200).json({succes: "la modification a reussi"}))
                                 .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                       
                    }
                    else{
                        return res.status(400).json({error: "Ce code existe déjà"})
                    }
                })
                .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
      
                }
               else
                  {
                    res.status(500).json({error: "cet beneficiaire existe déjà"})
                  }
         })
         .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))

   
                   
                     
         

}

function getAsingleBeneficiaire(req, res, next){
    const id= req.params.id
    Beneficiaire.getBeneficiaireByIdInModel(id)
        .then(beneficiaire=> res.status(200).json(beneficiaire))
        .catch(error=> res.status(400).json(error))
}


function getAllBeneficiaires(req,res, next){
    const beneficiaire={
        estActif: req.body.estActif,
        debut: req.body.debut,
        fin: req.body.fin
    }
    

     Beneficiaire.getAllBeneficiaireInModel(beneficiaire)
        .then(beneficiaires=> res.status(200).json(beneficiaires))
        .catch(error=> res.status(400).json(error))
}





 
module.exports={
    disableBeneficiaire,
    addBeneficiaire,
    updateBeneficiaire,
    getAsingleBeneficiaire,
    getAllBeneficiaires,
}