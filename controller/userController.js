const Models = require("../models/user")
const { CREATED, INTERNAL_SERVER_ERROR, SERVER_ERROR, OK, BAD_REQUEST_MESSAGE, NOT_FOUND, USER_RECORD_NOT_EXIST, USERS_FOUND, USER_UPDATED, USER_DELETED, CANNOT_DELETE_USER } = require("../constants/constants");
const { sendResponse } = require("../helpers/index");

const { validationResult } = require("express-validator");

module.exports.createUser = async (req, res, next) => {

    const {   Title,
        IsActive,
        CreatedBy,
        UpdatedBy, } = req.body;
    try {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, errors))
        }
        const user = new Models({
            Title,
            IsActive,
            CreatedBy,
            UpdatedBy,
            // File : req.file.filename,
          });
        let users = await Models.findOne({Title})
        if(users) {
            res.status(200).json({status : false, message : "User is already exist"})
        } else { 
        
            await user.save();
            if (user) {

                return res
                .status(CREATED)
                .json(sendResponse({ user: user }, CREATED, CREATED))
            }
            }

      
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}


module.exports.getAllUser = async (req, res, next) => {
    try {


    const users = await Models.find()
      if (users && users.length > 0) {
        return res
        .status(OK)
        .json(sendResponse({ user: users }, OK, USERS_FOUND))      } else {
      }
      
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}



module.exports.getUserById = async (req, res, next) => {
  try {
      const { id } = req.params;

      if (!id)
          return res
              .status(BAD_REQUEST)
              .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

      const user = await Models.findById(id)

      if (!user)
          return res
              .status(NOT_FOUND)
              .json(sendResponse(null, NOT_FOUND, USER_RECORD_NOT_EXIST))

      return res
          .status(OK)
          .json(sendResponse({ user: user }, OK, USERS_FOUND))

  } catch (error) {
      console.log(" ::error:: ", error);
      return res
          .status(INTERNAL_SERVER_ERROR)
          .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
  }
}


module.exports.updateUser = async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res
        .status(BAD_REQUEST)
        .json(sendResponse(null, NOT_FOUND, errors))
    }

    const { id } = req.params;
    if (!id)
      return res
        .status(BAD_REQUEST)
        .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE));

    const User = await Models.findByIdAndUpdate(id, { $set : req.body,
    },{new : true});

    if (User[0] === 0) {
      return res
        .status(NOT_FOUND)
        .json(sendResponse(null, NOT_FOUND, USER_RECORD_NOT_EXIST));
    }

    return res
      .status(OK)
      .json(sendResponse(null, OK, USER_UPDATED));

  } catch (error) {
    console.log(" ::error:: ", error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
  }
}


module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(BAD_REQUEST)
        .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE));
    const User = await Models.Admins.findOne(id);
    if (User) {
      return res
        .status(BAD_REQUEST)
        .json(sendResponse(null, BAD_REQUEST, CANNOT_DELETE_USER));

    } else {
      const user = await Models.findByIdAndDelete({ where: { id } });

      if (user === 0) {
        return res
          .status(NOT_FOUND)
          .json(sendResponse(null, NOT_FOUND, USER_RECORD_NOT_EXIST));
      }
      return res.status(OK).json(sendResponse(null, OK, USER_DELETED));
    }
  } catch (error) {
    console.log(" ::error:: ", error)
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
  }
}