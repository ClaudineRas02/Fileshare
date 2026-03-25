import { pool } from "../config/db.js";

export async function getFileBytoken(token) {
    const sql = `
                    SELECT f.* FROM files f JOIN  qrcodes q ON f.id_file = q.file_id WHERE q.token = $1
                `
    const { rows } = await pool.query(sql,[token])
    return rows[0]
}


export async function incrementAccess(token) {
    const sql = `
                    UPDATE qrcodes SET nb_access = nb_access + 1 WHERE token = $1 RETURNING nb_access
                `
    const { rows } = await pool.query(sql, [token])
    return rows[0]
}
