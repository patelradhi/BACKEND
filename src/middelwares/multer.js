const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/uploads'); // Destination folder for uploaded files
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

// Initialize upload
const upload = multer({
	storage: storage,
}).single('image'); // 'image' should match with input field name in the form

exports.uploadImg = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			console.error(err);

			res.send('Error uploading file.');
		} else {
			console.log(req.file, '////////////////////////////////////');
			res.send('File uploaded successfully.');
			next();
		}
	});
};
