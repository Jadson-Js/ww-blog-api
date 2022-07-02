const router = require('express').Router()
const { check } = require('express-validator');

// const verifyJwt = require('@middlewares/verifyJwt')
// const authPermission = require('@auth/permission')

const validResult = require('@helpers/validResult')
const categoryControllers = require('@controllers/category')
const {  logDefault, logCategory } = require('@utils/constants')

router.get('/categories',
    categoryControllers.getCategories
)

router.get('/category/:categoryId',
    check('categoryId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    categoryControllers.getCategoryById
)

router.post('/category', // Acesso restrito a escritores
    // authPermission(config.permissions.createCategory),
    check('title').isLength({ min: 1, max: 36 }).isString().withMessage(logDefault.invalidName),
    validResult,
    categoryControllers.createCategory
)

router.delete('/category/:categoryId', // Acesso restrito a escritores
    // authPermission(config.permissions.deleteCategory),
    check('categoryId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    categoryControllers.deleteCategory
)

module.exports = router