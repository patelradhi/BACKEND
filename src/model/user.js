


'use strict';

const { type } = require("os");

module.exports = (sequelize,Datatypes)=>{

    const User = sequelize.define("userInfo" ,{
        Id:{
            type:Datatypes.UUID,
            primaryKey: true
            
        },
        Email :{
            type:Datatypes.STRING

        },
        Name :{
            type: Datatypes.STRING
        },
        Contact:{
            type:Datatypes.STRING
        },
        Address:{
            type:Datatypes.STRING
        },
        Password:{
            type:Datatypes.STRING
        },
        Role:{
            type:Datatypes.INTEGER,
            defaultValue:0
        }


    })
    sequelize.sync({ alter: false });
    return User;

}