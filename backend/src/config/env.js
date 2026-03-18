import 'dotenv/config'


const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const port = toInt(process.env.PORT, 3000);
const bcryptsaltRound = toInt(process.env.BCRYPT_SALT_ROUNDS)
const appBaseUrl = process.env.APP_BASE_URL;

export const env = {
    port,
    databaseurl: process.env.DATABASE_URL,
    appBaseUrl,
    adminName: process.env.ADMIN_NAME,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    bcryptsaltRound,
    sessionSecret: process.env.SESSION_SECRET
}
