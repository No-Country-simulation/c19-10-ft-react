const express = require("express")
const router = express.Router()
const donationController = require("../payments/mercadopago.config")
const donationControllerResponde = require("../controllers/donation.controller")

router.post('/donate', donationController.donation);
router.get('/success', donationControllerResponde.success )
router.get('/failure', donationControllerResponde.failure);
router.get('/pending', donationControllerResponde.pending);


module.exports = router