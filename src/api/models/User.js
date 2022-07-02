 module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
         name: DataTypes.STRING,
         password: DataTypes.STRING,
         RoleId: {
            type: DataTypes.INTEGER,
            allowNull: false
         }
     });
     User.associate = function (models) {
         User.belongsTo(models.Role, {
                 foreingkey: 'RoleId',
                 as: 'role'
             })
     }
     return User;
 }