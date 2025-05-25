import express from 'express';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/private', protect, (req, res) => {
  res.json({ message: 'Protected route accessed!' });
});

export default router;
