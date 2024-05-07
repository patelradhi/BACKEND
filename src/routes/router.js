const express = require('express');
const router = express.Router();

//controller import

const {
	createUser,
	updateUser,
	fetchUsersList,
	fetchUsersListById,
	deleteUser,
	login,
} = require('../controller/adminController');
const { productCreate } = require('../controller/productController');
const { batchCreate } = require('../controller/batchController');
const { auth, isAdmin, isUser } = require('../middelwares/auth');
const { uploadImg } = require('../middelwares/multer');

//making route

router.post('/create/user', createUser);
router.get('/get/user', auth, isAdmin, fetchUsersList);
router.get('/get/user/:Id', auth, isAdmin, fetchUsersListById);
router.put('/update/user', auth, isAdmin, updateUser);
router.delete('/delete/user/:id', auth, isAdmin, deleteUser);
router.get('/login', login);
router.post('/create/product', uploadImg, productCreate);
router.post('/create/batch', batchCreate);

//exports

module.exports = router;
