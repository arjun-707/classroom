const request = require('request');
const util = require('util')
const lodash = require('lodash')
const moment = require('moment')
const mongoose = require('mongoose')

exports.urlFormat = util.format
exports._ = lodash
exports.moment = moment
exports.isValidObjectId = mongoose.Types.ObjectId.isValid
exports.ObjectId = mongoose.Types.ObjectId

const isObject = data => (data instanceof Object && data.constructor.name == 'Object');
exports.isObject = isObject

const __LINE = () => {
  let e = new Error();
  let frame = e.stack.split("\n")[2];
  let lineNumber = frame.split(":")[1];
  // console.log(__LINE.caller)
  // console.log('lineNumber', lineNumber)
  // return `\nLine No.: ${lineNumber}\nFile: ${__filename}\n`;
  return `\nLine No.: ${lineNumber}`;
}
exports.__LINE = __LINE

const responseMessage = (responseObject) => {
  // console.log('responseMessage =====>', responseObject)
  let message = 'something went wrong'
  if (isObject(responseObject) && responseObject.status && isObject(responseObject.status)) {
    if (responseObject.status.message && isObject(responseObject.status.message)) {
      message = JSON.stringify(responseObject.status.message)
    }
    else if (responseObject.status.message && typeof responseObject.status.message == 'string')
      message = responseObject.status.message
  }
  return message
}
const handleHttpRequestResponse = (err, response, body, reqData, dataType) => {
  console.log('handleHttpRequestResponse =====> Error: ', err/* , body, reqData, dataType */)
  return new Promise((resolve, reject) => {
    try {
      if (err) {
        return reject({
          code: 500,
          message: new Error(err).message,
          reqData,
          line: __LINE(),
          body
        })
      }
      else if (response.statusCode != 200) {
        let sCode = response.statusCode
        let message = 'something went wrong'
        try {
          if (body.indexOf('502 Bad Gateway') < 0) {
            response = JSON.parse(body)
            message = responseMessage(response)
          }
        }
        catch (ex) {
          message = ex.message
        }
        return reject({
          code: sCode,
          message: message,
          reqData,
          line: __LINE(),
          body
        })
      }
      else {
        try {
          if (typeof body == 'string' && body.trim().toLowerCase().indexOf('"success"') == 0) {
            return resolve(body)
          }
          else {
            body = 'json' == dataType ? body : JSON.parse(body || {});
            if (body && typeof body == 'object')
              return resolve(body)
            else if (!isNaN(body)) {
              return resolve(+body)
            }
            else
              return reject({
                code: 500,
                message: 'invalid response',
                reqData,
                line: __LINE(),
                body
              })
          }
        }
        catch (err) {
          return reject({
            code: 500,
            message: err.message,
            reqData,
            line: __LINE(),
            body
          })
        }
      }
    }
    catch (err) {
      return reject({
        code: 500,
        message: err.message,
        reqData,
        line: __LINE(),
        body
      })
    }
  })
}

const jsonHeader = { 'content-type': 'application/json' }
exports.makeGetRequestSync = (url, headers = null, agentOptions = null) => {
  return new Promise(function (resolve, reject) {
    console.log('makeGetRequestSync ==> ', url, headers)
    let getContents = {
      url
    }
    if (headers) {
      getContents.headers = headers
    }
    if (agentOptions) {
      getContents.agentOptions = agentOptions
    }
    try {
      request(getContents, function (err, response, body) {
        handleHttpRequestResponse(err, response, body, { url }).then(resolve).catch(reject)
      })
    }
    catch (err) {
      return reject({
        code: 500,
        message: new Error(err).message,
        data: { url },
        line: __LINE()
      })
    }
  })
};
exports.makePostRequestSync = (url, data, headers = null, dataType = 'form', agentOptions = null) => {
  if (!headers)
    headers = jsonHeader
  return new Promise(function (resolve, reject) {
    let postContents = {
      headers,
      url,
      form: data
    }
    if ('json' == dataType) {
      postContents = {
        headers,
        url,
        json: data,
      };
    }
    if (agentOptions) {
      postContents.agentOptions = agentOptions
    }
    try {
      console.log('makePostRequestSync ==> ', JSON.stringify(postContents))
      request.post(postContents, function (err, response, body) {
        handleHttpRequestResponse(err, response, body, { postContents }, dataType).then(resolve).catch(reject)
      })
    }
    catch (err) {
      return reject({
        code: 500,
        message: new Error(err).message,
        data: { postContents },
        line: __LINE()
      })
    }
  })
};
exports.makePutRequestSync = (url, data, headers = null, dataType = 'form', agentOptions = null) => {
  if (!headers)
    headers = jsonHeader
  return new Promise(function (resolve, reject) {
    let putContents = {
      headers,
      url,
      form: data
    }
    if ('json' == dataType) {
      putContents = {
        headers,
        url,
        json: data,
      };
    }
    if (agentOptions) {
      putContents.agentOptions = agentOptions
    }
    try {
      console.log('makePutRequestSync ==> ', JSON.stringify(putContents))
      request.put(putContents, function (err, response, body) {
        handleHttpRequestResponse(err, response, body, { putContents }).then(resolve).catch(reject)
      })
    }
    catch (err) {
      return reject({
        code: 500,
        message: new Error(err).message,
        data: { putContents },
        line: __LINE()
      })
    }
  })
};
exports.makeDeleteRequestSync = (url, data, headers = null, dataType = 'form', agentOptions = null) => {
  if (!headers)
    headers = jsonHeader
  return new Promise(function (resolve, reject) {
    let deleteContents = {
      headers,
      url,
      form: data
    }
    if ('json' == dataType) {
      deleteContents = {
        headers,
        url,
        json: data,
      };
    }
    if (agentOptions) {
      deleteContents.agentOptions = agentOptions
    }
    try {
      console.log('makeDeleteRequestSync ==> ', JSON.stringify(deleteContents))
      request.delete(deleteContents, function (err, response, body) {
        handleHttpRequestResponse(err, response, body, { deleteContents }).then(resolve).catch(reject)
      })
    }
    catch (err) {
      return reject({
        code: 500,
        message: new Error(err).message,
        data: { deleteContents },
        line: __LINE()
      })
    }
  })
};
exports.validateRequiredParams = (requiredFields, params) => {
  if (Array.isArray(requiredFields) && isObject(params)) {
    const receivedFields = _.intersection(_.keys(params), requiredFields);
    if (requiredFields.length === receivedFields.length) {
      for (each in params) {
        if (
          requiredFields.indexOf(each) > -1 &&
          typeof params[each] == "string" &&
          params[each].length < 1
        )
          return false;
      }
      return params;
    } else {
      return false;
    }
  } else {
    return false;
  }
}