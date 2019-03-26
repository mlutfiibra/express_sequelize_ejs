'use strict';
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      get() {
        return() => `${hacktiv8} ${this.name}`
      }
    },
    secret: DataTypes.STRING,
    isLogin: DataTypes.INTEGER
  }, {
    
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.generateSecret = function() {
    return crypto.randomBytes(16).toString('base64')
  }

  const setSecretAndPassword = user => {
      user.secret = User.generateSecret()
      user.password = crypto.createHmac('sha256', user.secret)
                        .update(`hacktiv8${this.name}`)
                        .digest('hex')
  }

  User.beforeCreate(setSecretAndPassword)
  User.beforeUpdate(setSecretAndPassword)

  return User;
};