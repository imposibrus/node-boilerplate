
import Sequelize from 'sequelize';

export default function(sequelize) {
  return sequelize.define('User', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    meta: Sequelize.JSONB
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
