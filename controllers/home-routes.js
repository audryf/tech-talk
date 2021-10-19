const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id'});
      return;
    }
    const post = postData.get({ plain: true });
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;