'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define('Teachers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Teachers.associate = function(models) {
    // associations can be defined here
  };
  return Teachers;
};