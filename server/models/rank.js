'use strict';
module.exports = (sequelize, DataTypes) => {
  const rank = sequelize.define('rank', {
    content: DataTypes.STRING,
    date: DataTypes.DATE,
    week: DataTypes.INTEGER
  }, {});
  rank.associate = function(models) {
    rank.belongsTo(models.users, {foreignKey:'userId', as: 'users'})

  };
  return rank;
};
