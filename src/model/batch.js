'use strict';

const { type } = require('os');

module.exports = (sequelize, Datatypes) => {
	const Batch = sequelize.define('Batches', {
		id: {
			type: Datatypes.UUID,
			primaryKey: true,
		},
		productId: {
			type: Datatypes.STRING,
		},
		mrp: {
			type: Datatypes.FLOAT,
		},
		mfg_date: {
			type: Datatypes.DATE,
		},
		exp_date: {
			type: Datatypes.DATE,
		},
	});
	sequelize.sync({ alter: false });
	return Batch;
};
