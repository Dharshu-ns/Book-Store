import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Book } from './models/bookModel.js';

const app = express();
const PORT = 4444;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ data: books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ data: book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get book details
app.get('/books/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ data: book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});