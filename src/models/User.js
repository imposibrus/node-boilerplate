
const {createHmac} = require('crypto'),
    config = require('../lib/config'),
    beforeSaveHook = (user/*, options*/) => {
        if (user.changed('password')) {
            user.password = user.hashPassword(user.password);
        }
    };

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
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
            fullName: function() {
                return this.firstName + ' ' + this.lastName;
            },
        },
        setterMethods: {
            fullName: function(value) {
                const names = value.split(' ');

                this.setDataValue('firstName', names.slice(0, -1).join(' '));
                this.setDataValue('lastName', names.slice(-1).join(' '));
            },
        },
        instanceMethods: {
            validPassword(plainPassword) {
                return this.password === this.hashPassword(plainPassword);
            },
            hashPassword(plainPassword) {
                return createHmac('sha256', config.get('sessionSecret')).update(plainPassword).digest('hex');
            },
        },
    });
};
