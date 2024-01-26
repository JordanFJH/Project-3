const express = require("express")
require("dotenv").config()
const cors = require("cors")
const mongoConfig = require("./config");
mongoConfig()

const app = express()
const PORT = 8080;

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes")


//MIDDLEWARE
app.use(express.json())
app.use(cors())

// Initial Stuff

app.use("/api/users", userRoutes)
app.use("/auth", authRoutes)




app.get("/", (req, res) => {
    res.send("testing")
})

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})