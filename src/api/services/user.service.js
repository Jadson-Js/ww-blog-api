const bcrypt = require('bcryptjs')
const {User, Role, Product} = require('@models')

const usersService = {
    async getUsers () {
        let user = await User.findAll() 
        
        return user
    },

    async getUserById(id) {
        let user = await User.findByPk(id, {
            include: {model: Role, as: 'role'}
        }) 
        
        return user
    },

    async getUserByName(name) {
        let user = await User.findOne({
            where: {name: name}
        })
        
        return user
    },

    createUser(user) {
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(user.password, salt)

        return User.create({ name: user.name, password: hash, RoleId: 1});
    },

    async updateUserRole(userId, newRoleId) {
        User.update(
            { RoleId: newRoleId},
            { where: { id: userId } }
        )
    },

    async deleteUserById(id) {
        await User.destroy({
            where: { id: id }
        })
    }
}


module.exports = usersService