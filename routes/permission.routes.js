const router = require('express').Router()
const { check } = require('express-validator');

// const verifyJwt = require('@middlewares/verifyJwt')
// const authPermission = require('@auth/permission')

const validResult = require('@helpers/validResult')
const permissionControllers = require('@controllers/permission')
const { logDefault } = require('@utils/constants')

router.get('/permissions', 
    permissionControllers.getPermissions
),

router.get('/permission/:permissionId',
    check('permissionId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    permissionControllers.getPermissionById
)

router.post('/permission', // Acesso restrito a admins
    // authPermission(config.permissions.createPermission),
    check('title').isString().isLength({ min: 1, max: 32 }).withMessage(logDefault.invalidTitle),
    check('description').isString().isLength({ min: 1, max: 498 }).withMessage(logDefault.invalidDescription), 
    validResult,
    permissionControllers.createPermission
)

router.delete('/permission/:permissionId', // Acesso restrito a admins
    // authPermission(config.permissions.deletePermission),
    check('permissionId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    permissionControllers.deletePermission
)

module.exports = router