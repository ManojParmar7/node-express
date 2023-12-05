const { createUser, getAllUser, getUserById, updateUser, deleteUser, } = require("../controller/userController");
const moduleRoute = require("express").Router()
moduleRoute.route("/").get( getAllUser)
moduleRoute.route("/:id").get( getUserById)
moduleRoute.route("/").post( createUser)
moduleRoute.route("/:id").put( updateUser)
moduleRoute.route("/:id").delete(deleteUser)
module.exports = moduleRoute;