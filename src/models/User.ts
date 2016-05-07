
import * as Sequelize from 'sequelize';

export interface UserAttribute {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  meta?: any;
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute {
  fullName(): string;
  fullName(name: string): void;
}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttribute> {}

export function definition(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  return sequelize.define<UserInstance, UserAttribute>('User', {
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
        return this.firstName + ' ' + this.lastName;
      }
    },
    setterMethods: {
      fullName: function(value) {
        let names = value.split(' ');

        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
      }
    }
  });
}
