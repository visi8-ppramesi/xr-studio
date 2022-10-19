"use strict";

const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors({origin: true}));

app.get('/', (req, res) => {res.send('hello')})

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});