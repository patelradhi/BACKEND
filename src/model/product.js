'use strict';

const { type } = require('os');

module.exports = (sequelize, Datatypes) => {
	const Product = sequelize.define('products', {
		Id: {
			type: Datatypes.UUID,
			primaryKey: true,
		},
		Name: {
			type: Datatypes.STRING,
		},
		Type: {
			type: Datatypes.STRING,
		},
		Img: {
			type: Datatypes.STRING,
		},
	});
	sequelize.sync({ alter: false });
	return Product;
};
