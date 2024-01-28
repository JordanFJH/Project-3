const express = require("express")

const router = express.Router()

const constCtrl = require("../controllers/contentController")


router.get("/", constCtrl.getInfo)

router.post("/", constCtrl.addContent)

router.put("/", constCtrl.updateContent)

router.delete("/", constCtrl.delete)


module.exports = router