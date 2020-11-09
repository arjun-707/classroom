module.exports = {
  dbConfig: {
    mongo: {
      mongoURL: MONGO_URI || 'mongodb://localhost:27017/auth',
      mongoOptions: {
        useNewUrlParser: true,
        // autoReconnect: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    }
  }
}