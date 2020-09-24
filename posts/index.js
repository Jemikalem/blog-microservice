const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
//we need it to format datas input through the body request
app.use(bodyParser.json());
app.use(cors());

//this object will store every posts we create
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    // kf8f6r1e5vre8r
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on 4000')
})