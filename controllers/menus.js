const Menu= require("../models/Menus")
const express= require("express") 
const bodyParser=require("body-parser")
const app= express()
const jwt= require("jsonwebtoken")
app.use(bodyParser.json())
const bcrypt= require("bcrypt")
const initMenuClass= require("../classes/menus")


function addMenu(req, res,next){
      
         
        
        initMenuClass.menu.id= req.body.id
        initMenuClass.menu.libelle= req.body.libelle
       // initMenuClass.Menu.observations= req.body.observations
     //verifie si l'utilisateur existe en base
     Menu.checkIfMenuExists(initMenuClass.menu) 
          .then(menu=> {
                if(menu.length==0){ 
                      Menu.addMenuInModel(req)
                          .then(()=> res.status(201).json({succes: "la création a reussi"}))
                          .catch(()=> res.status(400).json({error: "erreur de la procédure stocké d'ajout"}));
                }
                else
                   {
                     res.status(500).json({error: "Le Menu existe déjà"})
                   }
          })
          .catch(()=> res.status(400).json({error: "erreur retournée par la procédure stockée de selectBy"}))
}





//supression logique d'un utilisateur
function disableMenu(req, res, next){
    Menu.disableMenuInModel(req,res)
}


 
module.exports={
    disableMenu,
    addMenu,
   
}