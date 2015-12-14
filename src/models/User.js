
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    meta: DataTypes.JSONB
  }, {
    paranoid: true,
    getterMethods: {
      fullName: function() {
        return this.firstName + ' ' + this.lastName
      }
    },
    setterMethods: {
      fullName: function(value) {
        var names = value.split(' ');

        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
      }
    }
  });
};
