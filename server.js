require('./configs/globals')

const express = require('express');
const socket = require('socket.io');
const { createServer } = require('http');
const { initMiddleware, finalMiddleware } = require(root_path('/middleware/app.middleware'))
const { connectMongo } = require(root_path('/lib/mongo'))
const { initRoutes } = require(root_path('/routes'))
const { socketConnection } = require(root_path('/socket'))

const app = express()
const server = createServer(app);
const io = socket(server);

const startApp = async () => {
  await connectMongo().catch(exit_app)
  socketConnection(io)
  initMiddleware(app)
  initRoutes(app)
  finalMiddleware(app)
  server.listen(PORT, _ => print(`[**] App listening at ${PORT}`))
}
startApp()