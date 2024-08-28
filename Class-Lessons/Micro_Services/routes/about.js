const express = require('express');
const properties = require('../package.json');

const aboutRouter = express.Router();

aboutRouter.get('/', (req, res) => {
    const aboutInfo = {
        name: properties.name,
        version: properties.version,
        description: properties.description,
        author: properties.author
    };
    res.json(aboutInfo);
});

module.exports = aboutRouter;

