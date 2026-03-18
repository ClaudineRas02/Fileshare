import { env } from './config/env.js' 
import express from 'express'
import session from 'express-session'
import routes from './routes/index.js'
import morgan from 'morgan'

const app = express()

//middleware for logs,session and routes
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use('/api',routes)

export default app
