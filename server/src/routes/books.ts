import { Router } from 'express';
import Book from '../models/Book.js';

const router = Router();

// List all
router.get('/', async (_req, res) => {
  const books = await Book.find().lean();
  res.json(books.map(b => ({
    id: String(b._id),
    title: b.title,
    author: b.author,
    description: b.description,
    imageUrl: b.imageUrl,
    likes: b.likes,
    creatorId: b.creatorId
  })));
});

// Create
router.post('/', async (req, res) => {
  const { title, author, description, imageUrl, creatorId } = req.body;
  if (!title || !author || !description || !imageUrl || !creatorId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const created = await Book.create({ title, author, description, imageUrl, creatorId });
  res.status(201).json({ id: String(created._id), title, author, description, imageUrl, likes: [], creatorId });
});

// Get by id
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).lean();
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json({ id: String(book._id), title: book.title, author: book.author, description: book.description, imageUrl: book.imageUrl, likes: book.likes, creatorId: book.creatorId });
});

// Update
router.put('/:id', async (req, res) => {
  const { title, author, description, imageUrl } = req.body;
  const updated = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, description, imageUrl },
    { new: true, runValidators: true }
  ).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json({ id: String(updated._id), title: updated.title, author: updated.author, description: updated.description, imageUrl: updated.imageUrl, likes: updated.likes, creatorId: updated.creatorId });
});

// Delete
router.delete('/:id', async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.status(204).end();
});

// Toggle like
router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId required' });
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  const hasLiked = book.likes.includes(userId);
  book.likes = hasLiked ? book.likes.filter(id => id !== userId) : [...book.likes, userId];
  await book.save();
  res.json({ id: String(book._id), title: book.title, author: book.author, description: book.description, imageUrl: book.imageUrl, likes: book.likes, creatorId: book.creatorId });
});

export default router;

