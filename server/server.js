const express = require("express")
const mongoConfig = require("./config");
require("dotenv").config()

const app = express()
const PORT = 8080;

const userRoutes = require("./routes/userRoutes");

mongoConfig()


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