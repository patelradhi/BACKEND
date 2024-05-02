const express = require("express")
const router = express.Router()

//controller import

const{createUser,updateUser,fetchUsersList,fetchUsersListById,deleteUser,login} = require("../controller/adminController")
const{auth,isAdmin,isUser} = require("../middelwares/auth")

//making route

router.post("/create/user",auth,isAdmin,createUser)
router.get("/get/user",fetchUsersList)
router.get("/get/user/:Id",fetchUsersListById)
router.put("/update/user",updateUser,)
router.delete("/delete/user/:id",deleteUser)
router.post("/login",login)


//exports

module.exports = router

