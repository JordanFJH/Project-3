const express = require("express")
require("dotenv").config()
const mongoConfig = require("./config");
mongoConfig()

const app = express()
const PORT = 8080;

const userRoutes = require("./routes/userRoutes");


// Initial Stuff
app.use("/api", userRoutes)


//MIDDLEWARE
app.use(express.json())


app.get("/", (req, res) => {
    res.send("testing")
})

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})