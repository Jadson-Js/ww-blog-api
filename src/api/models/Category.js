module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
         title: DataTypes.STRING
     });
     Category.associate = function (models) {
        Category.hasMany(models.Article, {
             as: 'articles'
         })
     }
     return Category;
 }