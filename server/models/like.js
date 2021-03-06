'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    message: DataTypes.STRING,
    matched: DataTypes.BOOLEAN
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.users, {foreignKey:'userId', as: 'user'})
    Like.belongsTo(models.Event, {foreignKey: 'EventId', as: 'event'})
  };
  return Like;
};
