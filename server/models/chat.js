'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    name: DataTypes.STRING
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
  };
  return chat;
};