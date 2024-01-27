const express = require("express")
const router = express.Router()
const { show } = require("../controllers/UserController")


router.get("/", show)




module.exports = router