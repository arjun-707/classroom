const { dbConfig: { mongo: { mongoURL, mongoOptions } } } = require(root_path(`/configs/${NODE_ENV}/config`))
const mongoose = require('mongoose')
const glob = require("glob")

exports.connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoURL, mongoOptions)
    const db = mongoose.connection;
    db.on('error', error => {
      mongoose.disconnect();
      return reject(`MongoDB connection error : ${error}`);
    });
    db.on('reconnected', () => {
      print('MongoDB reconnected!');
    });
    db.on('connected', () => {
      const models = glob.sync(root_path(`/models/*.model.js`));
      models.forEach(require);
      print(`[**] connected to database at ${mongoURL}`);
      return resolve(true)
    });
  });
}