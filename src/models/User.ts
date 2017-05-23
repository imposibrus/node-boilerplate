
import * as Sequelize from 'sequelize';
import {createHmac} from 'crypto';
import config from '../lib/config';

const beforeSaveHook = (user: UserInstance/*, options*/) => {
    if (user.changed('password')) {
        user.password = user.hashPassword(user.password);
    }
};

export interface UserAttribute {
    id: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    login: string;
    password: string;
    isAdmin: boolean;
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute {
    fullName(): string;
    fullName(name: string): void;
    validPassword(plainPassword: string): boolean;
    hashPassword(plainPassword: string): string;
}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttribute> {}

export function definition(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define<UserInstance, UserAttribute>('User', {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        paranoid: true,
        hooks: {
            beforeCreate: beforeSaveHook,
            beforeUpdate: beforeSaveHook,
        },
        getterMethods: {
            fullName() {
                return this.firstName + ' ' + this.lastName;
            },
        },
        setterMethods: {
            fullName(this: UserInstance, value: string) {
                const names = value.split(' ');

                this.setDataValue('firstName', names.slice(0, -1).join(' '));
                this.setDataValue('lastName', names.slice(-1).join(' '));
            },
        },
        instanceMethods: {
            validPassword(this: UserInstance, plainPassword: string): boolean {
                return this.password === this.hashPassword(plainPassword);
            },
            hashPassword(this: UserInstance, plainPassword: string): string {
                return createHmac('sha256', config.get('sessionSecret')).update(plainPassword).digest('hex');
            },
        },
    });
}
