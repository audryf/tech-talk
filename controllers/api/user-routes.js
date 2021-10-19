const router = require('express').Router();
const { User, Post } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({attributes: { exclude: ['password'] }})
    .then(userData => res.json(userData))
    .catch(error => res.status(500).json(error));
});

// GET single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.json(userData);
    })
    .catch(error => res.status(500).json(error));
});

// POST create user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {res.json(userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData);
        });
    })
    .catch(error => res.status(500).json(error));
});

// USER LOGIN ROUTE
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'Username not found' });
            return;
        }

        const isPassword = userData.validatePassword(req.body.password);
        if (!isPassword) {
            res.status(400).json({ message: 'Password is incorrect' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
    
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
          
    });
});

// user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
          console.log('hello')
        res.status(204).end();
      });
    }
    else {
        console.log('what is wrong with you')
      res.status(404).end()
    }
  });

// PUT update user by id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }
        res.json(userData);
    })
    .catch(error => res.status(500).json(error));
});

// DELETE single user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;