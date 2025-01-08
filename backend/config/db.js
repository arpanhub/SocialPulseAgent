const cassandra = require('cassandra-driver');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

console.log(process.env.SECURE_CONNECT_BUNDLE_PATH);

const client = new cassandra.Client({
  cloud: { 
    secureConnectBundle: process.env.SECURE_CONNECT_BUNDLE_PATH
  },
  credentials: {
    username: 'token',
    password: process.env.ASTRA_DB_TOKEN
  },
  keyspace: 'default_keyspace',
  logLevel: 'info'
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to AstraDB');
  } catch (err) {
    console.error('Error connecting to AstraDB:', err);
  }
}

module.exports = { connectDB, client };