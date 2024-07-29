const DonationService = require("../services/donation.service");
const { donation: createDonationReference } = require('../payments/mercadopago.config')

const donationService = new DonationService()

const create = async (req, res) => {
    try {
        const { title, amount, description, date, eventId, userId, paymentStatus } = req.body;
        
        if (!amount || !date || !eventId || !userId) {
            return res.status(400).json({
                message: "Is mandatory to bring data as...",
                data: {
                    title: "String",
                    description: "String",
                    amount: "Number",
                    date: "2024-07-17 00:18:02.002 -0300",
                    userId: 'UUID',
                    eventId: "UUID"
                }
            });
        }
        const data = { title, amount, description, date, eventId, userId, paymentStatus };
        const newDonation = await donationService.create(data)
        try {
                const paymentCheckout = await createDonationReference({
                    amount,
                    id: newDonation.id
                })
                return res.status(201).json({
                    message: "Donation created successfully", newDonation,
                    init_point: paymentCheckout.init_point
                })
        } catch (error) {
            await donationService.delete(newDonation.id);
            return res.status(500).json({
                advise: 'Error creating Mercado Pago preference, check de donation created or try later, Payment is a third party service',
                message: error.message, error
            });
        }

    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}

const updateDonationStatus = async (req, res) => {
    try {
        const paymentStatus = req.query.status
        const id = req.query.external_reference
      const updateStatus = await donationService.updateDonationStatus(id, paymentStatus)
        res.status(200).json({message: `The payment status is "${paymentStatus}".`, update: updateStatus});
        console.log(`The payment status is "${paymentStatus}".`, updateStatus)
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
  };

  const getById = async (req, res) => {
    try {
        const { id } = req.params
        const donationById = await donationService.findById(id)
        res.status(200).json({ message: `Donation with id: ${id} found`, donationById })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getByEventId = async(req, res) => {
    try {
        const { id } = req.params 
        const getByEventId = await donationService.findDonationByEventId(id) 
        res.status(200).json({ message: `Total Donations for event: ${id}`, getByEventId })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const data = { title, description }
        const updatedDonation = await donationService.updateData(id, data);
        res.status(200).json({ message: `Donation with id: ${id} updated`, updatedDonation })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonation = await donationService.delete(id);
        res.status(200).json({ message: `Donation with id: ${id} deleted`, deletedDonation })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


  module.exports = {
    create,
    updateDonationStatus,
    getById,
    getByEventId,
    update,
    _delete
    
  }