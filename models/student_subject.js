'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student_Subject = sequelize.define('Student_Subject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  Student_Subject.associate = function(models) {
    // associations can be defined here
    models.Subject.belongsToMany(models.Student, {through: models.Student_Subject, foreignKey: 'subjectId'})
    models.Student.belongsToMany(models.Subject, {through: models.Student_Subject, foreignKey: 'studentId'})
  };
  return Student_Subject;
};