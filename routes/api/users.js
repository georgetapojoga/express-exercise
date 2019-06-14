const express = require('express');
const app = express();
const router = express.Router();
const uuid = require('uuid');
const users = require('../../UsersJS');
const fs = require('fs');


//GET lista di users
router.get('/', async (req, res) => {


    fs.readFile('UsersJSON.json', { encoding: 'utf-8' }, function (err, file) {
        res.json(file);
        console.log(file);
    });

    //return res.send(Object.values(users))
    //res.json(users);
});

//GET lista di users by :ID 
router.get('/:id', async (req, res) => {

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

var obj = JSON.parse(users);

    fs.appendFile('UsersJSON.json', newuser, function (err, file) {

        res.json(obj);
        console.log(obj);

    })

    //users.push(newuser);
    //res.json(users);

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