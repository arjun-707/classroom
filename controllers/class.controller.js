
const { SuccessResponse, ErrorResponse } = require(root_path(`/utils/response`))

exports.list = async (req, res) => {
  try {
    return SuccessResponse(res, 'success', [], 'list')
  } catch (ex) {
    return ErrorResponse(res, 'badRequest', 'wrong', ex.message)
  }
}
exports.add = (req, res) => {
  try {
    return SuccessResponse(res, 'success', [], 'add')
  } catch (ex) {
    return ErrorResponse(res, 'badRequest', 'wrong', ex.message)
  }
}
exports.remove = (req, res) => {
  try {
    return SuccessResponse(res, 'success', [], 'remove')
  } catch (ex) {
    return ErrorResponse(res, 'badRequest', 'wrong', ex.message)
  }
}
exports.update = (req, res) => {
  try {
    return SuccessResponse(res, 'success', [], 'update')
  } catch (ex) {
    return ErrorResponse(res, 'badRequest', 'wrong', ex.message)
  }
}