// Express application setup
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi');
});


const routes = require('./routes');
app.use('/api', routes);


app.listen(5000, err => {
    console.log('Listening');
});
