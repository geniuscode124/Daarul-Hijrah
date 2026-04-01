require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    const res = await pool.query('SELECT * FROM "User" LIMIT 1');
    console.log("Success! Columns:", Object.keys(res.rows[0] || {}));
  } catch (e) {
    console.error("SQL Error:", e.message);
  } finally {
    await pool.end();
  }
}
run();
