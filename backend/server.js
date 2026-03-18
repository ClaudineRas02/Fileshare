import { pool } from "./src/config/db.js"
import app from "./src/app.js"
import { env } from './src/config/env.js'

const server = app.listen(env.port, () => {
    console.log(`Serveur en écoute sur le port http://localhost:${env.port}`)
});

const shutdown = (signal) => {
    console.log(`Signal ${signal} reçu, fermeture du serveur`)
    server.close(async () => {
        await pool.end()
        process.exit(0)
    })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM')) 
