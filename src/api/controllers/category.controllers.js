const categoryService = require('@services/category')
const { logDefault, logArticle, logCategory } = require('@utils/constants')

const categoryControllers = {
    async getCategories(req, res) {
        try {
            const categories = await categoryService.getCategories()

            res.status(200).json({
                status: 200,
                data: categories
            })
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    async getCategoryById(req, res) {
        const id = req.params.categoryId

        try {
            const category = await categoryService.getCategoryById(id)

            if (!category) {
                res.sendError(logCategory.categoryNotFound, 404)
            } else {
                res.status(200).json({
                    status: 200,
                    data: category
                })
            }
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }

    },

    async createCategory(req, res) {
        const category = {
            title: req.body.title
        }

        try {
            const titleAlreadyExist = await categoryService.getCategoryByTitle(category.title)
            if (titleAlreadyExist != undefined) {
                res.sendError(logDefault.nameAlreadyExist, 400)
                return 
            }

            await categoryService.createCategory(category)

            res.status(200).json({
                status: 200,
                success: true
            })
            
        } catch (err) {
            res.sendError(logDefault.somethingGoesWrong, 500)
        }
    },

    // async updateUserRole (req, res) {
    //     const userId = req.params.userId
    //     const newRoleId = req.body.newRoleId

    //     try {
    //         const user = await userService.getUserById(userId)
    //         if (!user) {
    //             res.sendError(logUser.userNotFound, 404)
    //             return
    //         }

    //         const role = await roleService.getRoleById(newRoleId)
    //         if (!role) {
    //             res.sendError(logRole.roleNotFound, 404)
    //             return
    //         }
        
    //         await userService.updateUserRole(userId, newRoleId)

    //         res.status(200).json({
    //             status: 200,
    //             success: true
    //         })

    //     } catch (err) {
    //         res.sendError(logDefault.somethingGoesWrong, 500)
    //     }
    // },

    async deleteCategory(req, res) {
        const id = req.params.categoryId

        try {
            let idExists = await categoryService.getCategoryById(id)

            if (!idExists) {
                res.sendError(logUser.categoryNotFound, 404)
            } else {
                await categoryService.deleteCategoryById(id)

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

module.exports = categoryControllers