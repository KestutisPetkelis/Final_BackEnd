const express = require('express')
const router = express.Router()

const middle = require("../middleware/main")

const {registeruser, loginuser, logout, allusers,
      changeavatar, createtopic, alltopics, gettopic,
      createpost, getFavoriteTopics,
      getauction, addbid, getuserinfo} =  require("../controllers/main")

router.post("/registeruser", middle.validateData, registeruser)
router.post("/login",loginuser)
router.get("/logout", logout)
router.get("/allusers", allusers)
router.post("/changeavatar", middle.validateAvatar, changeavatar)
router.post('/createtopic', middle.validateTopic, createtopic)
router.get("/alltopics", alltopics)
router.get("/topic/:id", gettopic)
router.post("/createpost/:id", middle.validatePost, createpost)
router.post("/getFavoriteTopics",getFavoriteTopics)

router.get("/auction/:id", getauction)
router.post("/addbid", addbid)
router.get("/info", getuserinfo)
// router.post("/createcar", createcar)
// router.post("/findcar", findcar)
// router.post("/findcarench", findcar2)
// router.post("/updatecar/:id", updatecar)
// router.get("/deletecar/:id",deletecar)

module.exports = router