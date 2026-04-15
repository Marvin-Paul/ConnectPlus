const { Client } = require('pg');
require('dotenv').config();

// Try the pooler on port 6543
const connectionString = "postgresql://postgres.nriqymkvilwfzuzsdxtl:0781384004marvin@aws-1-eu-north-1.pooler.supabase.com:6543/postgres";

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log('Successfully connected to the database via pooler');
    return client.query('SELECT current_user, current_database()');
  })
  .then(res => {
    console.log('Query result:', res.rows[0]);
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err.stack);
    process.exit(1);
  });
