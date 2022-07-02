const router = require('express').Router()
const { check } = require('express-validator');

const verifyJwt = require('@middlewares/verifyJwt')
const authPermission = require('@auth/permission')

const validResult = require('@helpers/validResult')
const loginControllers = require('@controllers/login')

const { logDefault } = require('@utils/constants')

router.get('/authenticate', 
    verifyJwt,
    validResult,
    loginControllers.authToken
)

router.post('/login', 
    check('name').isLength({ min: 1, max: 256 }).isString().withMessage(logDefault.invalidName), 
    check('password').isLength({ min: 8, max: 160 }).withMessage(logDefault.invalidPassword),
    validResult,
    loginControllers.loginUser
)

module.exports = router