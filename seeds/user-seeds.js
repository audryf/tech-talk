const { User } = require('../models');

const userList = [
    {
        username: 'creed96',
        email: 'creed@email.com',
        password: 'password'
    },
    {
        username: 'andy32',
        email: 'andy@email.com',
        password: 'password'
    },
    {
        username: 'jim42',
        email: 'jim@email.com',
        password: 'password'
    },
    {
        username: 'pam89',
        email: 'pam@email.com',
        password: 'password'
    },
    {
        username: 'micheal53',
        email: 'michael@email.com',
        password: 'password'
    },
    {
        username: 'kevin60',
        email: 'kevin@email.com',
        password: 'password'
    },
    {
        username: 'angela22',
        email: 'angela@email.com',
        password: 'password'
    },
    {
        username: 'dwight41',
        email: 'dwight@email.com',
        password: 'password'
    },
    {
        username: 'toby31',
        email: 'toby@email.com',
        password: 'password'
    },
    {
        username: 'kelly1',
        email: 'kelly@email.com',
        password: 'password'
    }
];

const users = () => {
    User.bulkCreate(userList, {individualHooks: true});
}

module.exports = users;