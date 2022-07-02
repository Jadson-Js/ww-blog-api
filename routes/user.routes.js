const router = require('express').Router()
const { check } = require('express-validator');

// const verifyJwt = require('@middlewares/verifyJwt')
// const authPermission = require('@auth/permission')

const validResult = require('@helpers/validResult')
const userControllers = require('@controllers/user')
const {  logDefault, logRole } = require('@utils/constants')

router.get('/users',
    userControllers.getUsers
)

router.get('/user/:userId',
    check('userId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.getUserById
)

router.post('/user', // Acesso restrito a admins
    // authPermission(config.permissions.createUser),
    check('name').isLength({ min: 1, max: 32 }).isString().withMessage(logDefault.invalidName),
    check('password').isLength({ min: 8, max: 160 }).withMessage(logDefault.invalidPassword),
    check('RoleId').isEmpty().withMessage(logRole.notAllowedSetRole),
    validResult,
    userControllers.createUser
)

router.put('/user/:userId', // Acesso restrito a admins
    // authPermission(config.permissions.editUserRole),
    check('userId').isNumeric().withMessage(logDefault.invalidId),
    check('newRoleId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.updateUserRole
)

router.delete('/user/:userId', // Acesso restrito a admins
    // authPermission(config.permissions.deleteUser),
    check('userId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    userControllers.deleteUser
)

module.exports = router