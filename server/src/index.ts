import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookshare';
const PORT = Number(process.env.PORT || 4000);

// Health route
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState });
});

// Books router placeholder - wire below
import booksRouter from './routes/books.js';
app.use('/api/books', booksRouter);

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

