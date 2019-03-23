'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    name: DataTypes.STRING
  }, {});
  chat.associate = function(models) {
    chat.belongsTo(models.Event, {foreignKey:'EventId', as: 'event'})
    chat.hasMany(models.message, {as: 'message'})

  };
  return chat;
};