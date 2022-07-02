const { Article, Category } = require('@models')

const articleService = {
    async getArticles() {
        let articles = await Article.findAll({
            attributes: ['id', 'title', 'description', 'ImageName', 'CategoryId', 'createdAt', 'updatedAt'],
            order: [['updatedAt', 'DESC']],
        })

        return articles
    },

    async getArticleById(id) {
        let article = await Article.findByPk(id)

        return article
    },

    async getArticleByTitle(title) {
        let article = await Article.findOne({
            where: {
                title: title
            }
        })

        return article
    },

    async getManyArticlesManyOffset(manyArticles, manyOffset) {
        let articles = await Article.findAll({
            attributes: ['id', 'title', 'description', 'ImageName', 'CategoryId', 'createdAt', 'updatedAt'],
            include : { model : Category ,  as : 'category' },
            order: [['updatedAt', 'DESC']],
            offset: parseInt(manyOffset),
            limit: parseInt(manyArticles)
        })

        return articles
    },
    
    async getManyCategoryArticlesManyOffset(categoryId, manyArticles, manyOffset) {
        let articles = await Article.findAll({
            where: {CategoryId: categoryId},
            attributes: ['id', 'title', 'description', 'ImageName', 'CategoryId', 'createdAt', 'updatedAt'],
            include : { model : Category ,  as : 'category' },
            order: [['updatedAt', 'DESC']],
            offset: parseInt(manyOffset),
            limit: parseInt(manyArticles)
        })

        return articles
    },

    async getImageFromArticle(ImageName) {
        const image = {};
            image.name = ImageName
            image.url = `/uploads/${image.name}`;

        return image
    },

    async createArticle(article) {
        return await Article.create({
            ImageName: article.ImageName,
            title: article.title,
            description: article.description,
            content: article.content,
            CategoryId: article.CategoryId
        });
    },

    async updateArticle(article) {
        Article.update(
            { 
                title: article.newTitle,
                description: article.newDescription,
                content: article.newContent,
                CategoryId: article.newCategoryId
            },
            { where: { id: article.id } }
        )
    },

    async deleteArticleById(id) {
        await Article.destroy({
            where: {
                id: id
            }
        })
    }
}


module.exports = articleService