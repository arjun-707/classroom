'use strict';
const path = require('path');
const root = path.resolve('./')

const GLOBAL_CONSTANTS = {
  PID: process.pid,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  root_path: filePath => `${root}${filePath}`,
  print: console.log,
  print_error: ERR => console.error(new Error(ERR)),
  exit_app: process.exit
}
for (let key in GLOBAL_CONSTANTS) {
  delete global[key]
  global[key] = GLOBAL_CONSTANTS[key]
}
for (let key in GLOBAL_CONSTANTS) typeof GLOBAL_CONSTANTS[key] != 'function' ? print(`${key}: ${GLOBAL_CONSTANTS[key]}`) : null

process.on('uncaughtException', (err) => print("\nNode uncaughtException:: ", err))
process.on('SIGTERM', (err) => {print("\nNode SIGTERM:: ", err); process.kill(PID)})
// process.on('SIGINT', (err) => print("\nNode SIGINT:: ", err);)
process.on('exit', (err) => print("\nNode exit:: ", err))
process.on('unhandledRejection', (err) => print("\nNode unhandledRejection:: ", err))

if (!NODE_ENV || ['development', 'production'].indexOf(NODE_ENV) < 0) {
  print_error(`environment variable NODE_ENV not found or invalid`)
  exit_app()
}
if (!PORT || isNaN(PORT)) {
  print_error(`invalid PORT`)
  exit_app()
}