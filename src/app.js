const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
var cors = require('cors');

const config = require('@config')

const sendError = require('@helpers/sendErrors')

const loginRoutes = require('@routes/login')
const userRoutes = require('@routes/user')
const articleRoutes = require('@routes/article')
const categoryRoutes = require('@routes/category')
const roleRoutes = require('@routes/role')
const permissionRoutes = require('@routes/permission')
const rolePermissionRoutes = require('@routes/role-permission')
const helmet = require('helmet');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(helmet());
app.use(sendError)

app.use('/', loginRoutes)
app.use('/', userRoutes)
app.use('/', articleRoutes)
app.use('/', categoryRoutes)
app.use('/', roleRoutes)
app.use('/', permissionRoutes) 
app.use('/', rolePermissionRoutes)

module.exports = app