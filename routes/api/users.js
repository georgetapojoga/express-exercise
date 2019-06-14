const express = require('express');
const app = express();
const router = express.Router();
const uuid = require('uuid');
const users = require('../../Users');

//GET lista di users
router.get('/', (req, res) => {
    //return res.send(Object.values(users));
    res.json(users);
});

//GET lista di users by :ID 
router.get('/:id', (req, res) => {

    //some ritorna vero o falso
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ Warning: `No user found with this id:  ${req.params.id}` });
    }

});

//POST di un utente
//uso un middleware  nell'index body-parse CHE RICHIAMO PRIMA DELLE ROUTES 
router.post('/', (req, res) => {
    const newuser = {
        id: uuid.v4(),
        username: req.body.username
    }


    users.push(newuser);
    res.json(users);

});

//PUT di un utente
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        const updUser = req.body;
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {

                user.username = updUser.username ? updUser.username : user.username;
                res.json({ msg: 'User updated' });
            }
        })
    }
    else {
        res.status(400).json({ Warning: `No user found with this id:  ${req.params.id}` });
    }
})

//DELETE di un utente by id

router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json({
            mex: 'User deleted',
            users: users.filter(user => user.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({ Warning: `No user found with this id:  ${req.params.id}` });
    }


});

module.exports = router; 