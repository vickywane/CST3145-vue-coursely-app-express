const sequelize = require("sequelize");

/**
 * Name of the database from the environment variables.
 * @type {string}
 */
const DB_NAME = process.env.DB_NAME;

/**
 * Username for the database from the environment variables.
 * @type {string}
 */
const DB_USER = process.env.DB_USER;

/**
 * Sequelize instance for database operations.
 * @type {import('sequelize').Sequelize}
 */
const Sequelize = new sequelize(DB_NAME, DB_USER, "", {
  dialect: "postgres",
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

/**
 * Establishes a database connection using Sequelize.
 * @returns {Promise<import('sequelize').Sequelize>} - Promise resolving to a Sequelize instance.
 */
const establishDBConnection = async () => {
  try {
    await Sequelize.authenticate();
  } catch (e) {
    console.log(`Error connecting: ${e}`);
  }

  return Sequelize;
};

/**
 * Exports the Sequelize instance and the function to establish a database connection.
 * @module Database
 * @type {{
 *   sq: import('sequelize').Sequelize,
 *   establishDBConnection: () => Promise<import('sequelize').Sequelize>
 * }}
 */
module.exports = { sq: Sequelize, establishDBConnection };
