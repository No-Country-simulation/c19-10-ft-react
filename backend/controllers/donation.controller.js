const DonationService = require("../services/donation.service");

const donationService = new DonationService()

const create = async (req, res) => {
    try {
        const { title, amount, description, date, eventId, userId } = req.body;        
        if(amount && date && eventId && userId) {
            const data = { title, amount, description, date, eventId, userId };
            const newDonation = await donationService.create(data)
            res.status(201).json({ message: "Event created successfully", newDonation })
        } else {
            res.status(400).json({ message: "Is mandatory to bring data as...", data: {
                title: "String",
                description: "String",
                amount: "Number",
                date: "2024-07-17 00:18:02.002 -0300",
                userId: 'UUID',
                eventId: "UUID"
            } });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}

const updateDonationStatus = async (req, res) => {
    try {
      const status = req.query.status
      const id = req.query.external_reference
      const updateStatus = await donationService.updateDonationStatus(id, status)
        res.status(200).json(`El pago figura "${status}".`, updateStatus);
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
  };

  module.exports = {
    create,
    updateDonationStatus
  }
