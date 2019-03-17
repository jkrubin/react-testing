'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    message: DataTypes.STRING
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};