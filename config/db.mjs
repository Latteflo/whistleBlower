import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect()
  .then(() => {
    console.log('database databasing');
  })
  .catch((err) => {
    console.error('database not databasing:', err);
  });

export { pool };
