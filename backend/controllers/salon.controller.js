const SalonService = require("../services/salon.service");
const UsersService = require("../services/users.service");


const salonService = new SalonService();
const usersService = new UsersService();

const create = async (req, res) => {
    try {
        const { title, description, telefono, email, instagram, facebook, webUrl, userId } = req.body;        
        if(title && userId) {
            const data = { title, description, telefono, email, instagram, facebook, webUrl, userId };
            // 
            const userById = await usersService.findById(userId);
            
            if (!userById) {
                return res.status(404).json({ message: 'We cannot found your user id' });
            }

            if (userById.userType !== 'salon') {
                return res.status(403).json({ message: 'User role has no permission to create a Salon' });
            }
            // 
            const newSalon = await salonService.create(data)
            res.status(201).json({ message: "Salon created successfully", newSalon })
        } else {
            res.status(400).json({ message: "Is mandatory to bring data as...", data: {
                title: "String",
                description: "String",
                telefono: "+54 11 3373 2304",
                instagram: "instagram url",
                facebook: "facebook url",
                webUrl: "web url",
                userId: 'UUID'
            } });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}

const get = async (req, res) => {
    try {
        const salon = await salonService.findAll()
        res.status(200).json({ salon })
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        console.log('🥂')
        console.log(id)
        const salonById = await salonService.findById(id)
        console.log('💪🏽')
        console.log(salonById)
        res.status(200).json({ salonById })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getSalonByUserId = async(req, res) => {
    try {
        const { id } = req.params 
        const salonByUserId = await salonService.findSalonByUserId(id) 
        res.status(200).json({ salonByUserId })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedSalon = await salonService.updateSalon(id, body);
        res.status(200).json({ message: `Salon with id: ${id} updated`, updatedSalon })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSalon = await salonService.delete(id);
        res.status(200).json({ message: `Salon with id: ${id} deleted`, deletedSalon })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = {
    create,
    get,
    getById,
    getSalonByUserId,
    update,
    _delete
}