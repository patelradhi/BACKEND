const dotenv = require('dotenv');
dotenv.config();
const { DataTypes, Sequelize, where } = require('sequelize');
const pg = require('pg');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST, // Host where PostgreSQL server is running
	dialect: 'postgres',
	dialectOptions: {
		// ssl: {
		// 	require: true,
		// },
		ssl: false,
	},
}); // Specify the dialect, in this case, PostgreSQL)

// Test the connection

sequelize
	.authenticate()
	.then(() => {
		console.log('pg connected successfully using sequelize');
	})
	.catch((error) => {
		console.error('Unable to connect to the database');
	});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db['User'] = require('./user')(sequelize, DataTypes);
db['Product'] = require('./product')(sequelize, DataTypes);
db['Batch'] = require('./batch')(sequelize, DataTypes);

module.exports = db;
