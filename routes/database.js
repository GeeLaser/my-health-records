/*var Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

var sequelize = new Sequelize('myHealthRecords', 'hhm14', 'Remember1!', { 
    host: 'softwaredesigndb.database.windows.net',
    dialect: 'mssql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    }
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database with this error: ', error);
    }
}

testConnection();

module.exports = sequelize;*/