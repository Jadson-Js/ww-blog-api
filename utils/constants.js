const logDefault = {
    invalidId: "Invalid id.",
    invalidName: "Invalid name.",
    invalidEmail: "Invalid email.",
    invalidPassword: "invalid password.",
    invalidTitle: "Invalid title.",
    invalidDescription: "Invalid description.",
    invalidPrice: "Invalid price.",
    nameAlreadyExist: "Name already exist.",
    titleAlreadyExist: "Title already exist.",
    emailAlreadyExist: "Email already exist.",
    somethingGoesWrong: "Something goes wrong."
}

const logUser = {
    userNotFound: "User not found.",
    requiredLogged: "Need to be logged in",
    invalidCredentials: "Name or password are incorrect.",
    tokenNotProvide: "No token provide.",
    tokenUnauthentic: "Unauthentic token",
    AccessDenied: "Logged in user does not have access to this content"
}

const logArticle = {
    articleNotFound: "Article not found.",
    imageNotFound: "Image not found",
    invalidDescription: "Invalid description",
    invalidContent: "Content of article is invalid.",
}

const logCategory = {
    categoryNotFound: "Category not found.",
}

const logRole = {
    roleNotFound: "Role not found.",
}

const logPermission = {
    permissionNotFound: "Permission not found.",
    permissionRequired: "Permission to access this route required"
}

const logRolePermission = {
    relationshipNotFound: "Relationship not found.",
}

module.exports = {logDefault, logUser, logArticle, logCategory, logRole, logPermission, logRolePermission}