import { pool } from '../config/db.js';
import { env } from '../config/env.js';
import bcrypt from 'bcrypt'

const required = ['adminName', 'adminEmail', 'adminPassword'];
for (const key of required) {
  if (!env[key]) {
    console.error(`Missing required env: ${key}`);
    process.exit(1);
  }
}

const hashedPassword = await bcrypt.hash(env.adminPassword,env.bcryptsaltRound)
const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  ON CONFLICT (email) DO NOTHING
  RETURNING id, name, email, created_at;
`;

try {
  const result = await pool.query(query, [env.adminName, env.adminEmail, hashedPassword]);
  if (result.rowCount === 0) {
    console.log('Admin déjà existant (email). Aucun insert.');
  } else {
    console.log('Admin inséré:', result.rows[0]);
  }
} catch (err) {
  console.error('Erreur lors de l\'insert admin:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
