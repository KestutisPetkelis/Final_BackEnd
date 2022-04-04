const express = require('express')
const router = express.Router()

const middle = require("../middleware/main")

const {registeruser, loginuser, logout, allusers,
      changeavatar, createtopic, alltopics, gettopic,
      createpost, getFavoriteTopics, myposts, 
      getnotifications, clearnotifications} =  require("../controllers/main")

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
router.get("/myposts", myposts)
router.get("/getnotifications", getnotifications)
router.get("/clearnotifications", clearnotifications)

module.exports = router