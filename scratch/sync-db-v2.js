const { Client } = require('pg');
require('dotenv').config();

const connectionString = "postgresql://postgres.nriqymkvilwfzuzsdxtl:0781384004marvin@aws-1-eu-north-1.pooler.supabase.com:6543/postgres";

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Add mediaUrls and visibility to Post table
    try {
      await client.query('ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "mediaUrls" TEXT[] DEFAULT \'{}\'');
      console.log('Added mediaUrls column to Post table');
      
      await client.query('ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "visibility" TEXT DEFAULT \'ANYONE\'');
      console.log('Added visibility column to Post table');
    } catch (e) {
      console.error('Migration error:', e.message);
    }

    console.log('Database matching complete');
  } catch (err) {
    console.error('Execution error:', err.stack);
  } finally {
    await client.end();
  }
}

run();
