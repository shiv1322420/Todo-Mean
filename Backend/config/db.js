const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'sqlite::memory';
const sequelize = new Sequelize(databaseUrl, {
    dialect: 'sqlite', // Specify the dialect here
  });

  //Function to test the database connection
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  

  testConnection();

module.exports = sequelize;