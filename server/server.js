const express = require("express")

const app = express()

const PORT = 8080;


//MIDDLEWARE



app.get("/", (req, res) => {
    res.send("testing")
})

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})