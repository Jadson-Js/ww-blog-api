const router = require('express').Router()
const { check } = require('express-validator');

// const verifyJwt = require('@middlewares/verifyJwt')
// const authPermission = require('@auth/permission')

const validResult = require('@helpers/validResult')
const roleControllers = require('@controllers/role')
const { logDefault, logRole } = require('@utils/constants')

router.get('/roles', 
    roleControllers.getRoles
)

router.get('/role/:roleId',
    check('roleId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    roleControllers.getRoleById
)

router.post('/role', // Acesso restrito a admins
    // authPermission(config.permissions.createRole),
    check('title').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidTitle),
    check('description').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    validResult,
    roleControllers.createRole
)

router.delete('/role/:roleId', // Acesso restrito a admins
    // authPermission(config.permissions.deleteRole),
    check('roleId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    roleControllers.deleteRole
)

module.exports = router