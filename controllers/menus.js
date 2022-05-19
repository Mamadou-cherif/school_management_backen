const Menu= require("../models/menus")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initMenuClass= require("../classes/menus")
const { init } = require("express/lib/application")
const { estActif } = require("../classes/rubriqueEvaluation")


function addaMenu(req, res, next) {

  const menuObjlib={
    libelle: req.body.libelle,
    menuPereId: req.body.menuPereId,
    estActif: 1
  }
 
  Menu.checkIfMenuExists(menuObjlib)
    .then(menu=>{
      if(menu.length==0){
            const menuObjRef={
              reference: req.body.reference,
              estActif:1
            }
            Menu.checkIfMenuExists(menuObjRef)
            .then(menuByReference=>{
              if(menuByReference.length==0){
                const menuObj={
                  reference: req.body.reference,
                  libelle: req.body.libelle,
                  descriptions: req.body.descriptions,
                  url: req.body.url,
                  menuPereId: req.body.menuPereId,
                  ordre: req.body.ordre,
                  typeMenu: req.body.typeMenu,
                  image: req.body.image,
                  creationUserId: req.body.creationUserId
                }
                    Menu.addAMenu(menuObj)
                    .then(()=> res.status(201).json({succes: "la création a reussi"}))
                    .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
              }
              else{
                return res.status(400).json({error: "Cette reference existe déjà"})
              }
                
            })
            .catch(()=>res.status(400).json({error}))
        
       }
      else{
        return res.status(400).json({error: "Ce menu existe déjà"})
      }
         
    })
    .catch(()=>res.status(400).json({error}))

}

function getAsingleMenu(req, res, next){
  Menu.getAsingleMenuInModel(req)
  .then(menu=> res.status(200).json({menu}))
  .catch(error=> res.status(400).json({error}))
}



function updatatMenu(req, res, next){
 
  const objMenu={
    libelle: req.body.libelle,
    menuPereId: req.body.menuPereId,
    estActif: 1
    }
    
   
    Menu.checkIfMenuExists(objMenu) 
        .then(menu=> {
              if((menu.length==0 ) || (menu[0].id== req.body.id)){ 
                const objMenu={
                  id:req.params.id,
                  reference: req.body.reference,
                  libelle: req.body.libelle,
                  descriptions: req.body.descriptions,
                  url: req.body.url,
                  menuPereId: req.body.menuPereId,
                  ordre: req.body.ordre,
                  typeMenu: req.body.typeMenu,
                  image: req.body.image,
                  modifDate: req.body.modifDate,
                  modifUserId: req.body.modifUserId,
                }

              
                    Menu.updatatMenuInModel(objMenu)
                        .then(()=> res.status(201).json({succes: "la modification a reussi"}))
                        .catch(()=> res.status(400).json({error: "erreur de la procédure stocké de modification"}));
              }
              else
                  {
                    res.status(500).json({error: "Ce Menu existe déjà"})
                  }
        })
        .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}

function getAllMenu(req,res, next){
  Menu.getAllMenusInModel(req)
  .then(menus=> res.status(200).json(menus))
  .catch(error=> res.status(400).json(error))
}

function getMenuPere(req, res, next){
  Menu.getMenuPereInModel()
  .then(menupere=> res.status(200).json(menupere))
  .catch(()=> res.status(400).json({error: "erreur de la selection des menus principaux"}));
}
function getMenuFils(req, res, next){
  Menu.getMenuFilsInModel()
  .then(sousmenus=> res.status(201).json({sousmenus}))
  .catch(()=> res.status(400).json({error: "erreur de la selection des menus fils"}));
}
//supression logique d'un utilisateur
function disableMenu(req, res, next){
    Menu.disableMenuInModel(req,res)
}

// ramene tous les menus d'un groupe donné

function getMenuFilsByGroupe(req, res, next){
    Menu.getMenuFilsByGroupeInModel(req)
      .then(menu=> res.status(200).json(menu))
      .catch(()=> res.status(400).json({error: "erreur"}))
} 

function getFilsByPere(req, res, next){
  Menu.getFilsByPereInModel(req)
    .then(menu=> res.status(200).json(menu))
    .catch(()=> res.status(400).json({error: "erreur"}))
} 

// ramene tous les menus qui ont des onglets 
function getWithOnglets(req, res, next){
  Menu.getWithOngletsInModels(req)
    .then(menus=> res.status(201).json(menus))
    .catch(()=> res.status(400).json({error: "erreur de la selection des menus principaux"}));
}
 
 
function menus_getMenuPrincipalByUser(req, res, next){
  const user= {
     userId: req.params.id,
  }
  Menu.menus_getMenuPrincipalByUser(user)
        .then(menu=> res.status(200).json({menu})) 
        .catch(()=> res.status(400).json({error: "vous avez une erreur!"}))
}
 
function menus_getMenuFilsByUserReference(req, res, next){
  const user= {
     userId: req.body.id,
     referenceMenu: req.body.reference
  }
  Menu.menus_getMenuFilsByUserReference(user)
        .then(sousmenus=> res.status(200).json({sousmenus})) 
        .catch(()=> res.status(400).json({error: "vous avez une erreur!"}))
}


module.exports={
  menus_getMenuFilsByUserReference,
    disableMenu,
    getMenuPere,
    getMenuFilsByGroupe,
    getWithOnglets,
    getAllMenu,
    menus_getMenuPrincipalByUser,
    updatatMenu,
    getMenuFils,
    addaMenu,
    getAsingleMenu,
    getFilsByPere
}