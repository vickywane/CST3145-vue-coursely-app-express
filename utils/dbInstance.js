require('dotenv').config()
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env?.DB_CONNECTION_URL

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

const dbClient = async () => {
  try {
    // await client.connect();

    const database =  client.db(process?.env?.DATABASE_NAME)
    await database.command({ ping: 1 });
    console.log("Pinged MongoDB cluter... DB Connected!");

    return database;
  } catch (e) {
    await client.close();
    throw Error(`Error connecting to DB: ${e}`);
  }
};

module.exports = dbClient;
