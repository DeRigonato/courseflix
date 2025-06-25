'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: {
    name: string;
  };
}

export default function Home() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CourFlix</h1>
            </div>
            <nav className="flex space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Olá, {user.name}</span>
                  <Link href="/dashboard" className="text-primary-600 hover:text-primary-800">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-primary-600 hover:text-primary-800">
                    Login
                  </Link>
                  <Link href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                    Cadastrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              Aprenda com os melhores
            </h2>
            <p className="mt-4 text-xl">
              Cursos online de alta qualidade para impulsionar sua carreira
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Cursos Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">
                    R$ {course.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Por {course.instructor.name}
                  </span>
                </div>
                <Link
                  href={`/courses/${course.id}`}
                  className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors inline-block text-center"
                >
                  Ver Curso
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
