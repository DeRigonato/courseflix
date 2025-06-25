import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { createCourse, getCourses, getCourseById } from '../controllers/courseController';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', authenticateToken, requireRole(['INSTRUCTOR', 'ADMIN']), createCourse);

export default router;
