
exports.messageTest = (io, socket) => {
  socket.on('message', msg => {
    console.log('message ==>', msg)
    io.emit('message', 'singh');
  });
}