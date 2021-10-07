const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(error => res.status(500).json(error));
});

// POST create a comment 
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => res.json(commentData))
    .catch(error => res.status(400).json(error));
});

module.exports = router;