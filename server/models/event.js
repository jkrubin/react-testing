'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.users)
  };
  return Event;
};