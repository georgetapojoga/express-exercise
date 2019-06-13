

const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const port = 3000;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

//GET lista di users
app.get('/users/', (req, res) => {
  return res.send(Object.values(users));
});

//GET lista di users by :ID 
app.get('/users/:id', (req, res) => {
  return res.send(users[req.params.id]);
});

//POST di un utente

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', (req, res) => {

  var id = req.body.id;
  var username = req.body.username;

  const user = {
    id,
    username,
  }

  users[id] = user;
  return res.send(user);
});

//PUT di un utente

app.put('/users', (req, res)=> {

  var id = req.params.id;

  if (id!=0)
  {
  
  }

})

//DELETE di un utente by id

app.delete('/users/:id', (req, res) => {

  var id = req.params.id;

  delete users[id];
  //users[id]= ' ';
  return res.send("utente " + id + " eliminato");

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 