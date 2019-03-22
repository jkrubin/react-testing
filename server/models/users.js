'use strict';

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if(!user.changed('password')) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    birthday: DataTypes.DATE,
    location: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePicture: {
      type: DataTypes.BLOB,
      get(){
	if(this.getDataValue('profilePicture')){
     	  return this.getDataValue('profilePicture').toString()
	}
      },
    },
    mimeType: DataTypes.STRING,
    bio: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {
  	hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });
  users.associate = function(models) {
    users.hasMany(models.Event, {as: 'Event'})
    users.hasMany(models.Like, {as: 'likes'})
  };
  users.prototype.comparePassword = function (enteredPass) {
    return bcrypt.compareAsync(enteredPass, this.password)
  }
  return users;
};
