"use strict";

const express = require('express');
const app = express();
const cors = require('cors')
const createShoot = require('./services/createShoot')
const editShoot = require('./services/editShoot')
const restructureBody = require('./utils/restructureBody')

app.use(express.json())
app.use(cors({origin: true}));
app.use(restructureBody)

app.get('/', (req, res) => {res.send('hello')})
app.post('/create', createShoot())
app.post('/edit', editShoot())

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});