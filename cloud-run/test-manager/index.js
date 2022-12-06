"use strict";

const express = require('express');
const app = express();
const cors = require('cors')

const createApp = function(){
    app.use(express.json())
    app.use(cors({origin: true}));
    
    app.get('/', (req, res) => {
        res.json({ test: "test" })
    })
    
    const port = parseInt(process.env.PORT) || 8081;
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