const articleService = require('@services/article')
const categoryService = require('@services/category')
const {
    logDefault,
    logArticle,
    logCategory
} = require('@utils/constants')

const articleControllers = {
    async getArticles(req, res) {
        try {
            const articles = await articleService.getArticles()

            res.status(200).json({
                status: 200,
                data: articles
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async getArticleById(req, res) {
        const id = req.params.articleId

        try {
            const article = await articleService.getArticleById(id)

            if (!article) {
                res.sendError(logArticle.articleNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: article
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }

    },

    async getArticleByTitle(req, res) {
        const title = req.params.articleTitle

        try {
            const article = await articleService.getArticleByTitle(title)

            if (!article) {
                res.sendError(logArticle.articleNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: article
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }

    },

    async getManyArticlesManyOffset(req, res) {
        const {manyArticles, manyOffset} = req.params

        try {
            const articles = await articleService.getManyArticlesManyOffset(manyArticles, manyOffset)

            res.status(200).json({
                status: 200,
                data: articles
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async getManyCategoryArticlesManyOffset(req, res) {
        const {categoryTitle, manyArticles, manyOffset} = req.params

        try {
            
            const category = await categoryService.getCategoryByTitle(categoryTitle)
            
            const articles = await articleService.getManyCategoryArticlesManyOffset(category.id, manyArticles, manyOffset)

            res.status(200).json({
                status: 200,
                data: articles
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async getImageFromArticle(req, res) {

        const id = req.params.ImageName


        try {
            const imageUrl = await articleService.getImageFromArticle(id)

            if (!imageUrl) {
                res.sendError(logArticle.imageNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: imageUrl
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }

    },

    async createArticle(req, res) {
        const article = {
            ImageName: req.file.filename,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            CategoryId: req.body.CategoryId
        }

        try {
            const titleAlreadyExist = await articleService.getArticleByTitle(article.title)
            if (titleAlreadyExist != undefined) {
                res.sendError(logDefault.titleAlreadyExist, 400)
                return
            }

            const categoryIdExist = await categoryService.getCategoryById(article.CategoryId)
            if (!categoryIdExist) {
                res.sendError(logCategory.categoryNotFound, 404)
                return
            }

            await articleService.createArticle(article)

            res.status(200).json({
                status: 200,
                success: true
            })

        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async updateArticle(req, res) {
        const article = {
            id: req.params.articleId,
            newTitle: req.body.newTitle,
            newDescription: req.body.newDescription,
            newContent: req.body.newContent,
            newCategoryId: req.body.newCategoryId
        }

        try {
            let idExists = await articleService.getArticleById(article.id)
            if (!idExists) {
                res.sendError(logArticle.articleNotFound, 404)
                return
            }

            const titleAlreadyExist = await articleService.getArticleByTitle(article.newTitle)
            if (titleAlreadyExist != undefined) {
                res.sendError(logDefault.titleAlreadyExist, 400)
                return
            }

            const categoryIdExist = await categoryService.getCategoryById(article.newCategoryId)
            if (!categoryIdExist) {
                res.sendError(logCategory.categoryNotFound, 404)
                return
            }

            await articleService.updateArticle(article)

            res.status(200).json({
                status: 200,
                success: true
            })

        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async deleteArticle(req, res) {
        const id = req.params.articleId

        try {
            let idExists = await articleService.getArticleById(id)

            if (!idExists) {
                res.sendError(logUser.articleNotFound, 404)
            } else {
                await articleService.deleteArticleById(id)

                res.status(200).json({
                    status: 200,
                    success: true
                })
            }

        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    }
}

module.exports = articleControllers