const { models } = require("../libs/sequelize");
const uuid = require('uuid');

class PostImagesService {
    constructor() { }

    async create(postImagesData) {

        const { postId, imgId } = postImagesData;
        const postImages = await models.PostImages.create({
            id: uuid.v4(),
            postId,
            imgId,
        });
        return postImages
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