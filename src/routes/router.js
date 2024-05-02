const express = require("express")
const router = express.Router()

//controller import

const{createUser,updateUser,fetchUsersList,fetchUsersListById,deleteUser} = require("../controller/userController")


//making route

router.post("/create/user",createUser)
router.get("/get/user",fetchUsersList)
router.get("/get/user/:Id",fetchUsersListById)
router.put("/update/user",updateUser,)
router.delete("/delete/user/:id",deleteUser)


//exports

module.exports = router

