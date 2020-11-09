module.exports = {
  MessageTest: require(root_path('/socket/handlers/message.socket')).messageTest,
  Disconnect: require(root_path('/socket/handlers/disconnect.socket')).disconnect,
  Create: require(root_path('/socket/handlers/create.socket')).create,
  Join: require(root_path('/socket/handlers/join.socket')).join
}