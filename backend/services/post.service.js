const { models } = require("../libs/sequelize");
const uuid = require('uuid');


class PostService {
    constructor() { }

    async create(postData) {

        const { title, content, userId, eventId } = postData;
        const post = await models.Post.create({
            id: uuid.v4(),
            title,
            content,
            userId,
            eventId
        });
        return post
    }

    async findAll() {
        try {
            return await models.Post.findAll()
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id) {
        try {
            return await models.Post.findOne({
                where: {id},
                include: [
                    {
                        model: models.PostImages,
                        as: 'post_images',
                        where: {postId: id},
                        attributes: {exclude: ['id', 'userId', 'eventId']},
                    }
                ]
            });
        } catch (error) {
            console.log(error)
        }
    }
    async updatePost(id, data) {
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

module.exports = PostService