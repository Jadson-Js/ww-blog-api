const router = require('express').Router()
const upload = require('@utils/uploadFile')
const { check } = require('express-validator');


const validResult = require('@helpers/validResult')
const articleControllers = require('@controllers/article')
const {  logDefault, logArticle } = require('@utils/constants')

router.get('/articles',
    articleControllers.getArticles
)

router.get('/article/:articleId',
    check('articleId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    articleControllers.getArticleById
)

router.get('/article/title/:articleTitle',
    check('articleTitle').isLength().withMessage(logDefault.invalidTitle),
    validResult,
    articleControllers.getArticleByTitle
)

router.get('/articles/limit/:manyArticles/offset/:manyOffset',
    check('manyArticles').isNumeric(),
    check('manyOffset').isNumeric(),
    validResult,
    articleControllers.getManyArticlesManyOffset
)

router.get('/articles/category/:categoryTitle/limit/:manyArticles/offset/:manyOffset',
    check('categoryTitle').isLength().isString().withMessage(logDefault.invalidName),
    check('manyArticles').isNumeric(),
    check('manyOffset').isNumeric(),
    validResult,
    articleControllers.getManyCategoryArticlesManyOffset
)

router.get('/article/image/:ImageName',
    check('ImageName').isNumeric().withMessage(logDefault.invalidId),

    validResult,
    articleControllers.getImageFromArticle
)

router.post('/article', // Acesso restrito a escritores
    // authPermission(config.permissions.createArticle),
    upload.single('image'),
    check('title').isLength({ min: 1, max: 160 }).isString().withMessage(logDefault.invalidName),
    check('description').isLength({ min: 8}).withMessage(logDefault.invalidPassword),
    check('content').isLength({ min: 2 }).withMessage(logArticle.invalidContentArticle),
    check('CategoryId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    articleControllers.createArticle
)

router.put('/article/:articleId',
    check('articleId').isNumeric().withMessage(logDefault.invalidId),
    check('newTitle').isLength({ min: 1, max: 160 }).isString().withMessage(logDefault.invalidTitle),
    check('newDescription').isLength({ min: 8 }).withMessage(logArticle.invalidDescription),
    check('newContent').isLength({ min: 2 }).withMessage(logArticle.invalidContent),
    check('newCategoryId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    articleControllers.updateArticle
)

router.delete('/article/:articleId', // Acesso restrito a escritores
    // authPermission(config.permissions.deleteArticle),
    check('articleId').isNumeric().withMessage(logDefault.invalidId),
    validResult,
    articleControllers.deleteArticle
)

module.exports = router