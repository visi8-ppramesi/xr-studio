"use strict";

const express = require('express');
const app = express();
const cors = require('cors')
const createStudioTour = require('./services/createStudioTour')
const restructureBody = require('./utils/restructureBody')
const {tokenIdMiddleware} = require('./middlewares/tokenId')

const createApp = function(){
    app.use(express.json())
    app.use(cors({origin: true}));
    app.use(tokenIdMiddleware)
    app.use(restructureBody)
    
    app.get('/', (req, res) => {res.send('hello')})
    app.post('/create-studio-tour', createStudioTour())
    
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