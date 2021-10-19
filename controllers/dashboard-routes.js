const router = require('express').Router();
const { Post, User, Comment } = require("../models");

router.get('/', (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{
            model: Comment,
            indlude: {
                model: User,
                attributes: ['username']
            }
        }]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
})

module.exports = router;