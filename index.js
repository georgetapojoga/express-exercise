const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/users', require('./routes/api/users'))


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server started on port ${port}!`)) 