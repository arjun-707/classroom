const { httpCodes } = require(root_path(`/utils/response/httpCodes`))
const { successMsg, errorMsg } = require(root_path(`/utils/response/messages`))

const SUCCESS = {
  message: httpCodes.success.msg,
  code: httpCodes.success.code,
  status: true,
  data: []
}
const ERROR = {
  message: httpCodes.internal.msg,
  code: httpCodes.internal.code,
  status: false,
  description: null
}

exports.SuccessResponse = (RESPONSE, code, data, message = null) => {
  if (!data)
    throw new Error(`message required to send response to client`)
  if (!httpCodes[code])
    throw new Error(`http code not found for ${code}`)
  if (!RESPONSE || !RESPONSE instanceof Object)
    throw new Error(`response object required`)
  SUCCESS.message = successMsg[message] ? successMsg[message] : httpCodes[code].msg
  SUCCESS.code = httpCodes[code].code
  SUCCESS.data = data
  return RESPONSE.status(SUCCESS.code).send(SUCCESS)
}
exports.ErrorResponse = (RESPONSE, code, message = null, description = null) => {
  if (!httpCodes[code])
    throw new Error(`http code not found for ${code}`)
  if (!RESPONSE)
    throw new Error(`response object required`)
  ERROR.message = errorMsg[message] ? errorMsg[message] : httpCodes[code].msg
  ERROR.code = httpCodes[code].code
  ERROR.description = description
  return RESPONSE.status(ERROR.code).send(ERROR)
}