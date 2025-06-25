import { Router } from 'express';

const router = Router();

// Implementar depois
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

export default router;
