const { DataTypes, Sequelize,where} = require('sequelize');
const pg = require("pg")

const sequelize = new Sequelize('users_records','postgres','postgres',
 { host: 'localhost',   // Host where PostgreSQL server is running
  dialect: 'postgres' })// Specify the dialect, in this case, PostgreSQL)


// Test the connection

sequelize.authenticate()
.then(()=>{
   console.log("pg connected successfully using sequelize")
})
.catch((error)=>{
     console.error('Unable to connect to the database');

})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db["User"] = require("./user")(sequelize,DataTypes)
db['Product'] = require('./product')(sequelize, DataTypes);
db['Batch'] = require('./batch')(sequelize, DataTypes);


module.exports = db