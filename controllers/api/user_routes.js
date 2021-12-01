const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributoes: { exclude: ['password'] }
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this ID'});
            return;

        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email:req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'Email does not exist'});
            return;
        }
        const validatePassword = dbUserData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect Password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            // req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You're logged in!" });
        });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;