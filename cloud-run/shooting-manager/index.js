"use strict";

const express = require('express');
const app = express();
const cors = require('cors')
const createShoot = require('./services/createShoot')
const editShoot = require('./services/editShoot')
const testService = require('./services/testService')
const restructureBody = require('./utils/restructureBody')

const createApp = function(){
    app.use(express.json())
    app.use(cors({origin: true}));
    app.use(restructureBody)
    
    app.get('/', (req, res) => {res.send('hello')})
    app.post('/test', testService())
    app.post('/create', createShoot())
    app.post('/edit', editShoot())
    
    const port = parseInt(process.env.PORT) || 8080;
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });

    return app
}

if (require.main === module) {
    createApp()
    console.log("called directly")
} else {
    module.exports = createApp
}