import express from 'express'
import authRouter from './modules/auth/user.routes.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/health', (req, res) => res.status(200).send('Alive'))

app.use('/api/auth', authRouter);

export default app;