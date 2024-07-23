const express = require("express")
const router = express.Router()
const mpController = require("../payments/mercadopago.config")
const donationController = require("../controllers/donation.controller")
router.post('/create', donationController.create);
router.post('/donate', mpController.donation);
router.get('/success', donationController.updateDonationStatus );
router.get('/failure', donationController.updateDonationStatus);
router.get('/pending', donationController.updateDonationStatus);


module.exports = router