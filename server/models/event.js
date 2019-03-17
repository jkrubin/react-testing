'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.users, {foreignKey:'userId', as: 'users'})
    Event.hasMany(models.Like, {as: 'likes'})

  };
  return Event;
};
