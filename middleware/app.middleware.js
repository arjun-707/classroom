const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser')
const { ErrorResponse } = require(root_path(`/utils/response`))

exports.initMiddleware = app => {

  app.use(express.static(root_path('/fe')));
  app.use(express.static(root_path('/assets')));

  // query param parsing
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // cross origin
  app.use((req, res, next) => {
    print('req.host        ==> ', req.get('Host'))
    print('req.originalUrl ==> ', req.originalUrl)
    print('req.method      ==> ', req.method)
    print('req.query       ==> ', req.query)
    print('req.body        ==> ', req.body)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // global error handling and send response
  app.use((err, req, res, next) => {
    if (!err) return next()
    print('****************************** express-async-errors ******************************');
    print_error(err);
    print('req.originalUrl =====> ', req.get('Host'), req.originalUrl)
    if (!res.headersSent) return ErrorResponse(res, 'internal', 'wrong', err.message)
  });
}
exports.finalMiddleware = app => {

  // 404 Handler
  app.use((req, res, next) => {
    return ErrorResponse(res, 'notFound')
  })
}