'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email tidak sesuai format"
        }
      }
    },
    subjectId: DataTypes.INTEGER
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {foreignKey:'subjectId'})
  };

  Teacher.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  }

  Teacher.uniqueEmail = function (email) {
    return this.findAll()
      .then(data => {
        let found = false
        data.find(element => {
          if (element.dataValues.email === email) {
            found = true
          }
        });
        return found
      })
  }

  // Teacher.uniqueEmail = function(input) {
  //   Teacher.findAll()
  //     .then(teachers => {
  //       let email = teachers.map(el=>el.dataValues.email)
  //       return email.find(el => el===input)
  //     })
  // }

  return Teacher;
};