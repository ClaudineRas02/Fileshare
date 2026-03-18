import { pool } from "../config/db.js"
export async function findUser(email) {
    const query = 'SELECT password FROM users WHERE email=$1'
    try{
        const { user } = await pool.query(query,[email])
        return user[0] ?? null
    }catch(error){
        throw error
    }
}