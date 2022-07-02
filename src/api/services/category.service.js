const { Article, Category } = require('@models')

const categoryService = {
    async getCategories () {
        let category = await Category.findAll() 
        
        return category
    },

    async getCategoryById(id) {
        let category = await Category.findByPk(id, {
            include: { 
                model : Article,  
                as : 'articles', 
                attributes: ['id', 'title', 'ImageName', 'createdAt', 'updatedAt'],
                limit: 3, 
                order: [['updatedAt', 'DESC']],
            },
        }) 
        
        return category
    },

    async getCategoryByTitle(title) {
        let category = await Category.findOne({
            where: {title: title}
        })
        
        return category
    },

    async createCategory(category) {
        return await Category.create({ title: category.title });
    },

    async updateCategoryRole(categoryId, newRoleId) {
        Category.update(
            { RoleId: newRoleId},
            { where: { id: categoryId } }
        )
    },

    async deleteCategoryById(id) {
        await Category.destroy({
            where: { id: id }
        })
    }
}

module.exports = categoryService