const { Comment } = require('../models');

const commentList = [
    {
        comment_text: 'Awesome!',
        user_id: 1,
        post_id: 10
    },
    {
        comment_text: 'Thanks for sharing!',
        user_id: 2,
        post_id: 9
    },
    {
        comment_text: 'I never would have thought of this on my own. I will have to check it out.',
        user_id: 3,
        post_id: 8
    },
    {
        comment_text: 'All I can say is, WOW',
        user_id: 4,
        post_id: 7
    },
    {
        comment_text: 'Thank you for this information',
        user_id: 5,
        post_id: 6
    },
    {
        comment_text: 'Saving this for later!',
        user_id: 6,
        post_id: 5
    },
    {
        comment_text: 'This is a great topic. There needs to be more talk about things like this.',
        user_id: 7,
        post_id: 4
    },
    {
        comment_text: 'Happens to me all the time',
        user_id: 8,
        post_id: 3
    },
    {
        comment_text: 'That was unexpected',
        user_id: 9,
        post_id: 2
    },
    {
        comment_text: 'Good read',
        user_id: 10,
        post_id: 1
    },
    {
        comment_text: 'Can you recommend more topics like this? Just starting out here!',
        user_id: 1,
        post_id: 2
    },
    {
        comment_text: 'I would like to see more posts from you!',
        user_id: 3,
        post_id: 4
    },
    {
        comment_text: 'Do you have any advice for a newbie?',
        user_id: 5,
        post_id: 6
    },
    {
        comment_text: 'I appreciate seeing these!',
        user_id: 7,
        post_id: 8
    },
    {
        comment_text: 'Good stuff, very good stuff.',
        user_id: 9,
        post_id: 10
    }
]

const comments = () => {
    Comment.bulkCreate(commentList, {individualHooks: true});
}

module.exports = comments;