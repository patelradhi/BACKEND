const db = require('../model/index');
const product = db.Product;
const uuid = require('uuid');

//..................product creation.............................................../

exports.productCreate = async (req, res) => {
	try {
		const { Name, Type } = req.body;
		console.log(req.body, '........................................');

		if (!Name || !Type) {
			return res.status(400).json({
				success: false,
				message: 'Required field(s) missing.',
			});
		}

		const productExist = await product.findOne({
			where: {
				Name: Name,
			},
		});

		// if (productExist) {
		// 	return res.status(409).json({
		// 		success: false,
		// 		message: 'This product already exists.',
		// 	});
		// }

		console.log('//////>>>>>>>>>>>>>>>>', req.file);
		// const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
		const imageUrl = req.file.path;

		const newId = uuid.v4();

		const newProduct = await product.create({
			Id: newId,
			Name: Name,
			Type: Type,
			Img: imageUrl,
		});

		console.log('Product created successfully.');

		//response

		res.json({
			success: true,
			message: 'Product created successfully.',
			product: newProduct,
		});
	} catch (error) {
		console.error('Error creating product:', error);
		console.log('Response already sent:', res.headersSent);
		res.json({
			success: false,
			message: 'Internal server error.',
		});
	}
};
