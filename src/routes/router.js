const express = require("express")
const router = express.Router()

//controller import

const{createUser,updateUser,fetchUsersList,fetchUsersListById,deleteUser,login} = require("../controller/adminController")
const { productCreate ,fetchProductList} = require('../controller/productController');
const { batchCreate ,fetchBatchList} = require('../controller/batchController');
const{auth,isAdmin,isUser} = require("../middelwares/auth");
const multer = require("multer");
const { uploadImg } = require('../middelwares/multer');

//making route

router.post("/create/user",auth,isAdmin,createUser)
router.get("/get/user",auth,isAdmin,fetchUsersList)
router.get("/get/user/:Id",auth,isAdmin,fetchUsersListById)
router.put("/update/user",auth,isAdmin,updateUser,)
router.delete("/delete/user/:id",auth,isAdmin,deleteUser)
router.post("/create/product",auth,isUser,uploadImg,productCreate)
router.post("/create/batch",auth, isUser ,batchCreate)
router.get("/get/product",auth, isUser,fetchProductList)
router.get("/get/batch",auth, isUser,fetchBatchList)

router.get("/login",login)


//exports

module.exports = router

