const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// GET all posts /api/posts/
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(postData => res.json(postData))
        .catch(error => res.status(500).json(error));
});

// GET a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(error => res.status(500).json(error));
});

// POST create new post 
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
    })
        .then(postData => res.json(postData))
        .catch(error => res.status(500).json(error));
});

// PUT update a post by id
router.put('/:id', (req, res) => {
    Post.update(
        {
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(error => res.status(500).json(error));
});

// DELETE a post by id 
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(error => res.status(500).json(error));
});

module.exports = router;