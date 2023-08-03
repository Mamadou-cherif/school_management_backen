const express = require("express")
const app = require("./app")
const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log("le server est bien en ecoute  au http://localhost:" + port)
})

console.log("Starting...");