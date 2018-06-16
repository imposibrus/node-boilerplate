
import {
    Table, Column, Model, AllowNull, NotEmpty, Default, BeforeCreate, BeforeUpdate, Unique
    , IsEmail} from 'sequelize-typescript';
import {cloneDeep, omit} from 'lodash';

import hashPassword from '../lib/hashPassword';

@Table({
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'Users',
})
export default class User extends Model<User> {
    @Column
    public firstName: string;

    @Column
    public lastName: string;

    @Column
    public phone: string;

    @IsEmail
    @Column
    public email: string;

    @AllowNull(false)
    @NotEmpty
    @Unique
    @Column
    public login: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    public password: string;

    @Default(false)
    @Column
    public isAdmin: boolean;

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    set fullName(value: string) {
        const names = value.split(' ');

        this.setDataValue('firstName', names.slice(0, -1).join(' '));
        this.setDataValue('lastName', names.slice(-1).join(' '));
    }

    public validPassword(pass: string) {
        return this.password === hashPassword(pass);
    }

    public toJSON() {
        const plainObj = cloneDeep(this.get()),
            privateAttributes: string[] = ['password', 'fullName', 'createdAt', 'updatedAt', 'deletedAt'];

        return omit(plainObj, privateAttributes);
    }

    @BeforeCreate
    @BeforeUpdate
    public static userPasswordChange(user: User) {
        if (user.changed('password')) {
            user.password = hashPassword(user.password);
        }
    }
}
