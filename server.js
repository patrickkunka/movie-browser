const express = require('express');
const path    = require('path');

const server = express();
const PORT = 3000;
const IP = '0.0.0.0';

server.use('/public', express.static(path.join(__dirname, 'dist')));

server.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(PORT, IP, () => console.log(`server listening on port ${PORT}`));