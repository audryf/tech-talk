const users = require('./user-seeds');
const posts = require('./post-seeds');
const comments = require('./comment-seeds');

const sequelize = require('../config/connection');

const runSeeds = async () => {
    await sequelize.sync({ force: true });
    await users();
    await posts();
    await comments();
};

runSeeds();