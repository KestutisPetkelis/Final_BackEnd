const express = require('express')
const router = express.Router()

const middle = require("../middleware/main")

const {registeruser, loginuser, logout, allusers, createauction,
    allauctions, getauction, addbid, getuserinfo} =  require("../controllers/main")

router.post("/registeruser", middle.validateData, registeruser)
router.post("/login",loginuser)
router.get("/logout", logout)
router.get("/allusers", allusers)
router.post('/createauction', middle.validateAuction, createauction)
router.get("/allauctions", allauctions)
router.get("/auction/:id", getauction)
router.post("/addbid", addbid)
router.get("/info", getuserinfo)
// router.post("/createcar", createcar)
// router.post("/findcar", findcar)
// router.post("/findcarench", findcar2)
// router.post("/updatecar/:id", updatecar)
// router.get("/deletecar/:id",deletecar)

module.exports = router