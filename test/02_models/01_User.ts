import 'should';
import {describe, beforeEach, it} from 'mocha';

import * as models from '../../src/models';

describe('User model', () => {
    let userInstance: models.User;

    beforeEach(() => {
        userInstance = models.User.build({
            firstName: 'Vadim',
            lastName: 'Petrov',
            phone: '1234567890',
            email: 'email@mail.ru',
            login: 'login',
            password: 'password',
        });
    });

    it('should getter method `fullName` return sum of `firstName` and `lastName`', () => {
        userInstance.fullName.should.be.equal('Vadim Petrov');
    });

    it('should setter method `fullName` set `firstName` and `lastName`', () => {
        userInstance.fullName = 'Yuri Nikolaev';
        userInstance.firstName.should.be.equal('Yuri');
        userInstance.lastName.should.be.equal('Nikolaev');
        userInstance.fullName.should.be.equal('Yuri Nikolaev');
    });

    it('should check password and return false', () => {
        userInstance.validPassword('wrong password').should.be.equal(false);
    });

    it('should JSON representation omit private fields', () => {
        userInstance.toJSON().should.be.eql({
            id: null,
            isAdmin: false,
            firstName: 'Vadim',
            lastName: 'Petrov',
            phone: '1234567890',
            email: 'email@mail.ru',
            login: 'login',
        });
    });
});
