'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.hasMany(models.Student_Subject, {foreignKey: 'studentId'})
  };

  Student.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  }
  return Student;
};