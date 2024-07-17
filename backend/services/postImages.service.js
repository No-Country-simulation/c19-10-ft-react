const { models } = require("../libs/sequelize");
const uuid = require('uuid');

class PostImagesService {
    constructor() { }

    async create(postImagesData) {

        const { url, postId, userId, eventId } = postImagesData;
        const postImages = await models.PostImages.create({
            id: uuid.v4(),
            url,
            postId,
            userId,
            eventId
        });
        return postImages
    }

    async findAll() {
        try {
            return await models.PostImages.findAll()
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id) {
        try {
            return await models.PostImages.findOne({
                where: {id}
            });
        } catch (error) {
            console.log(error)
        }
    }
    async updatePostImage(id, data) {
        try {
            const model = await this.findById(id)
            return await model.update(data);
        } catch (error) {
            console.error(error);
        }
    }

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

module.exports = PostImagesService