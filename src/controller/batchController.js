const db = require('../model/index');
const batch = db.Batch;
const uuid = require('uuid');
const moment = require('moment');

const product = db.Product;
const { where } = require('sequelize');

//..................batch creation.............................................../

exports.batchCreate = async (req, res) => {
	try {
		const { productName, mrp, mfg, exp } = req.body;
		console.log(req.body, '........................................');

		//validation

		if (!productName || !mrp || !mfg || !exp) {
			return res.status(400).json({
				success: false,
				message: 'Required field(s) missing.',
			});
		}

		// Validate MRP
		if (isNaN(parseFloat(mrp)) || parseFloat(mrp) <= 0) {
			return res.status(400).json({
				success: false,
				message: 'Invalid MRP. MRP must be a positive number.',
			});
		}

		// Validate Mfg and Exp dates
		const dateFormat = 'YYYY-MM-DD'; // Define the expected date format
		if (!moment(mfg, dateFormat, true).isValid() || !moment(exp, dateFormat, true).isValid()) {
			return res.status(400).json({
				success: false,
				message: 'Invalid date format. Date format must be YYYY-MM-DD.',
			});
		}

		//find product based on it's id

		const findId = await product.findOne({
			where: {
				Name: productName,
			},
		});

		if (!findId) {
			return res.json({
				success: false,
				message: 'Product id not exist',
			});
		}

		const ProductId = findId.Id;

		//unique id
		const newId = uuid.v4();

		const newBatch = await batch.create({
			id: newId,
			productId: ProductId,
			mrp: mrp,
			mfg_date: new Date(req.body.mfg),
			exp_date: new Date(req.body.exp),
		});

		res.status(201).json({
			success: true,
			message: 'Product created successfully.',
			Batch: newBatch,
		});
	} catch (error) {
		console.log('Error creating product:', error);
		res.status(500).json({
			success: false,
			message: 'Internal server error.',
		});
	}
};
