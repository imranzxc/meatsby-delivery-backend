const http = require('http');
const app = require('./routes/app');
const server = http.createServer(app);
const express = require('express');
const path = require('path');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
