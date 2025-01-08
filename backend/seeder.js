const { DataAPIClient } = require('@datastax/astra-db-ts');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

// Setup token and instance URL from environment variables
const token = process.env.ASTRA_DB_TOKEN;
const instanceUrl = 'https://70592732-5c84-4703-b528-5db0101833c5-us-east-2.apps.astra.datastax.com'; // Astra DB instance URL

// Initialize the Astra DB client
const client = new DataAPIClient(token);
const db = client.db(instanceUrl);

// Collection name
const collection = db.collection('engagement_data');

// Random data generators for engagement fields
const postTypes = ['carousel', 'reels', 'static_image'];

const generateRandomLikes = () => Math.floor(Math.random() * 1000);
const generateRandomShares = () => Math.floor(Math.random() * 500);
const generateRandomComments = () => Math.floor(Math.random() * 300);

// Seed data function
const seedData = async () => {
  const documents = [];
  const numberOfRecords = 100; // Generate 100 records

  for (let i = 0; i < numberOfRecords; i++) {
    const postData = {
      post_id: uuidv4(),
      post_type: postTypes[Math.floor(Math.random() * postTypes.length)],
      likes: generateRandomLikes(),
      shares: generateRandomShares(),
      comments: generateRandomComments(),
      posted_at: new Date().toISOString(),
    };

    documents.push(postData);
  }

  try {
    // Insert all documents
    await collection.insertMany(documents);
    console.log('Data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};
 
// Run the seed data function
seedData();
