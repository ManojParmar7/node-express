const { OK, RECORD_FOUND } = require("../constants/constants");
module.exports.sendResponse = (
  data = null,
  code = OK,
  message = RECORD_FOUND
) => {
  return {
    data,
    code,
    message,
  };
};









