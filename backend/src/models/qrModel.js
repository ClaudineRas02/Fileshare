import { pool } from "../config/db.js";

export async function createQrcode({fileId, token}) {
    const sql = `
                    INSERT INTO qrcodes(file_id, token) VALUES ($1,$2)
                    RETURNING *;
                `

    const { rows } = await pool.query(sql,[fileId, token])
    return rows[0]
}