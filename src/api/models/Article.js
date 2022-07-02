module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {

        ImageName: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        content: DataTypes.TEXT,

        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Article.associate = function (models) {
        Article.belongsTo(models.Category, {
                foreingkey: 'CategoryId',
                as: 'category'
            })
    }
    return Article;
}