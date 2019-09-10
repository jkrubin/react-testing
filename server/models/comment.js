'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    date: DataTypes.Date,
    week: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.users, {foreignKey:'userId', as: 'users'})

  };
  return comment;
};
