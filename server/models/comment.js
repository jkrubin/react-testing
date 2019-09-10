'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    content: DataTypes.STRING,
    date: DataTypes.Date,
    week: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.users, {foreignKey:'userId', as: 'users'})

  };
  return Event;
};
