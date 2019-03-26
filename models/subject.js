'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher, {foreignKey:'subjectId'})
    Subject.hasMany(models.Student_Subject, {foreignKey: 'subjectId'})
  };
  
  return Subject;
};