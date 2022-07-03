const userService = require('@services/user')
const loginService = require('@services/login')
const { logUser } = require('@utils/constants')

const loginControllers = {
    authToken(req, res) {
        res.status(200).json({
            auth: true
        })
    },

    async loginUser(req, res) {
        const findUser = {
            name: req.body.name,
            password: req.body.password
        }

        try {
            let userFound = await userService.getUserByName(findUser.name)
            if (!userFound) {
                res.sendError(logUser.userNotFound, 404)
                return
            }

            const validUser = await loginService.verifyPassword(findUser.password, userFound.password)

            if (!validUser) {
                res.sendError(logUser.invalidCredentials, 403)
            } else {
                const token = await loginService.createToken(userFound.id, userFound.roleId);

                res.status(200).json({
                    status: 200,
                    auth: true,
                    token: token
                })
            }

        } catch (err) {
            res.sendError(constants.somethingGoesWrong, 500)
        }
    }
}

module.exports = loginControllers