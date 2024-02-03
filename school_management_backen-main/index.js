const express = require("express")
const app = require("./app")
const cron = require('node-cron');
const port = process.env.PORT || 3000

// Votre logique de notification ici
function sendNotifications() {
    console.log('Je vais être executé au 1h 50');
    // Placez ici votre logique d'envoi de notifications
  }
  
  // Planifiez la tâche pour 7h le 5 de chaque mois
  cron.schedule('50 1 11 11 *', () => {
    sendNotifications();
  });

  
app.listen(port, () => {
    console.log("le server est bien en ecoute  au http://localhost:" + port)
})

console.log("Starting...");