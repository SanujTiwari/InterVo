import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import env from '../src/config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

const runMigration = async () => {
  console.log('🔄 Starting database migration...');
  console.log(`📡 Connecting to database...`);
  
  const client = new Client({
    connectionString: env.databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database. Reading schema file...');

    const schemaPath = path.join(__dirname, 'migrations', '001_initial_schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('⏳ Running migration script...');
    // Execute SQL script
    await client.query(sql);
    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

runMigration();
