const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const slimeRoutes = require('./controllers/slimes')
const titleRoutes = require('./controllers/titles')

server.use('/slimes', slimeRoutes)
server.use('/titles', titleRoutes)

const port = process.env.PORT || 3000;

// Root route
server.get('/', (req, res) => res.send('Hello bro!'))

module.exports = server
