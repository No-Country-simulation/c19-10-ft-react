const { models } = require("../libs/sequelize");
const uuid = require('uuid');

class ImageService {
    constructor() { }

    async create(imagesData) {

        const { url, userId } = imagesData;
        const image = await models.Image.create({
            id: uuid.v4(),
            url,
            userId
        });
        return image
    }

    async findAll() {
        try {
            return await models.Image.findAll()
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id) {
        try {
            return await models.Image.findOne({
                where: {id}
            });
        } catch (error) {
            console.log(error)
        }
    }
    async updateImage(id, data) {
        try {
            const model = await this.findById(id)
            return await model.update(data);
        } catch (error) {
            console.error(error);
        }
    }
    // 

    async delete(id) {
        try {
            const model = await this.findById(id);
            await model.destroy();
            return { deleted: true };
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ImageService