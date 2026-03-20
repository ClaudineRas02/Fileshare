import { pool } from "../config/db.js";

export async function findUser(email) {
  const query = "SELECT id, email, password FROM users WHERE email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0] ?? null;
}
