const express = require('express')
const router = express.Router()

// Include controllers
const provincesController = require('../controllers/provinces')

// Include authentication middleware

router.get('/eastern-cape', provincesController.getEasternCape)

router.get('/free-state', provincesController.getFreeState)

router.get('/gauteng', provincesController.getGauteng)

router.get('/kwa-zulu-natal', provincesController.getKwaZuluNatal)

router.get('/limpopo', provincesController.getLimpopo)

router.get('/mpumalanga', provincesController.getMpumalanga)

router.get('/north-west', provincesController.getNorthWest)

router.get('/northern-cape', provincesController.getNorthernCape)

router.get('/western-cape', provincesController.getWesternCape)




module.exports = router