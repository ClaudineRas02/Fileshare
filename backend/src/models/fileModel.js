import { pool } from "../config/db.js";

export async function  saveFile ({userId, title, file_path, file_type, description }){

    const sql = `
                    INSERT INTO files( uploaded_by, title, file_path, file_type, description ) VALUES($1, $2, $3, $4, $5)
                    RETURNING *
                `

    const { rows } = await pool.query(sql,[userId, title, file_path, file_type, description])
    return rows[0]
}