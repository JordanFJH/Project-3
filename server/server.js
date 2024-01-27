const express = require("express")
const { authorize } = require("./middleware/authMiddleware")
require("dotenv").config()
const cors = require("cors")
const mongoConfig = require("./config");
mongoConfig()

const app = express()
const PORT = 8080;

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes")
const contentRoutes = require("./routes/contentRoutes")


//MIDDLEWARE
app.use(express.json())
app.use(cors())

// Initial Stuff

app.use("/api/users", authorize, userRoutes)
app.use("/auth", authRoutes)
app.use("/content", contentRoutes)




app.get("/", (req, res) => {
    res.send("testing")
})

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})