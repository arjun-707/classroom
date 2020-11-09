const {
  MessageTest,
  Disconnect,
  Create,
  Join
} = require(root_path('/socket/handlers'))

exports.socketConnection = io => {

  io.on('connection', socket => {

    Create(io, socket)
    Join(io, socket)
    MessageTest(io, socket)
    Disconnect(io, socket)

  });
}