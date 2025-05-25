import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import testRoutes from './routes/testRoutes';
import boardRoutes from './routes/boardRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies


app.use('/api/auth', authRoutes);
// Health check route
app.get('/', (_req, res) => {
  res.send('TaskBridge API is running...');
});
app.use('/api/test', testRoutes);
app.use('/api/boards', boardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


