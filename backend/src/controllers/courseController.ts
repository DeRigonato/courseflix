import { Request, Response } from 'express';
import { prisma } from '../app';

interface AuthResquest extends Request {
  user?: any;
}

export const createCourse = async (req: AuthResquest, res: Response) => {
  try {
    const { title, description, price } = req.body;
    const instructorId = req.user.id;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        instructorId
      },
      include: {
        instructor: {
          select: { id: true, name: true, email: true }
        },
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Course crate successfuly',
      course
    });


  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: {
        instructor: {
          select: { id: true, name: true }
        },
        modules: {
          include: {
            lessons: {
              select: { id: true, title: true, duration: true, isFree: true }
            }
          }
        },
        _count: {
          select: { enrollments: true }
        }
      }
    });

    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: { id: true, name: true }
        },
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                description: true,
                duration: true,
                isFree: true,
                order: true
              }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!course) {
      return res.status(401).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
