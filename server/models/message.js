'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    content: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.chat, {foreignKey:'chatId', as: 'chat'})
    message.belongsTo(models.users, {foreignKey:'userId', as: 'user'})
  };
  return message;
};