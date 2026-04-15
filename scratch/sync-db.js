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

    // 1. Create Enum
    try {
      await client.query('CREATE TYPE "Role" AS ENUM (\'USER\', \'ADMIN\')');
      console.log('Created Role enum');
    } catch (e) {
      if (e.code === '42710') { // duplicate_object
        console.log('Role enum already exists');
      } else {
        throw e;
      }
    }

    // 2. Add Column
    try {
      await client.query('ALTER TABLE "User" ADD COLUMN "role" "Role" NOT NULL DEFAULT \'USER\'');
      console.log('Added role column to User table');
    } catch (e) {
      if (e.code === '42701') { // duplicate_column
        console.log('role column already exists');
      } else {
        throw e;
      }
    }

    console.log('Database matching complete');
  } catch (err) {
    console.error('Execution error:', err.stack);
  } finally {
    await client.end();
  }
}

run();
