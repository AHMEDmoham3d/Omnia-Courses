import { useState, useEffect } from 'react';
import Header from './components/Navbar';
import Hero from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { CourseCard } from './components/CourseCard';
import { CourseDetails } from './components/CourseDetails';
import { Footer } from './components/Footer';
import { Particles } from './components/Particles';
import { LoginPage } from './components/LoginPage';
import { Course } from './lib/supabase';
import { Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const mockCourses: Course[] = [
    {
      id: "1",
      title: "Whispers of the pendulum",
      description: "Learn the fundamentals of pendulum dowsing, its history, and practical applications in decision-making and energy work.",
      short_description: "Master the art of pendulum dowsing from basics to advanced techniques.",
      price: 49.99,
      duration: "4 hours",
      level: "Beginner",
      image_url: "/public/pandol.png",
      instructor_name: "Omnia Abdo",
      instructor_bio: "Expert in metaphysical sciences with 15+ years experience.",
      instructor_image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      category: "Pendulum",
      is_featured: true,
      enrollment_count: 1500,
      rating: 4.8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "Tarot Card Reading Mastery",
      description: "Dive deep into the world of Tarot, learning card meanings, spreads, and intuitive reading techniques for personal growth.",
      short_description: "Unlock the secrets of Tarot cards and become a confident reader.",
      price: 59.99,
      duration: "6 hours",
      level: "Intermediate",
      image_url: "/public/card.jpeg",
      instructor_name: "Omnia Abdo",
      instructor_bio: "Professional Tarot reader and spiritual counselor.",
      instructor_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      category: "Tarot",
      is_featured: true,
      enrollment_count: 1200,
      rating: 4.9,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Energy Healing Sessions with Crystals",
      description: "Explore crystal healing therapies, chakra balancing, and energy work sessions to promote wellness and harmony.",
      short_description: "Discover the power of crystals for healing and energy alignment.",
      price: 39.99,
      duration: "3 hours",
      level: "Beginner",
      image_url: "/public/heal.jpg",
      instructor_name: "Omnia Abdo",
      instructor_bio: "Certified crystal healer and Reiki practitioner.",
      instructor_image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      category: "Healing",
      is_featured: true,
      enrollment_count: 2000,
      rating: 4.7,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setAuthLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setCourses(mockCourses);
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    filterCourses();
  }, [courses, selectedCategory, searchTerm]);

  const filterCourses = () => {
    let filtered = courses;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const categories = ['All', ...Array.from(new Set(courses.map(course => course.category)))];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-white mx-auto mb-4" size={48} />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Particles />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      <Header onLogout={() => setIsLoggedIn(false)} />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="courses">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">All  Courses</h2>
            <p className="text-xl text-gray-300 mb-8">Explore our comprehensive collection of pendulum education</p>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-300">No courses found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={setSelectedCourse}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-20 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Master the Pendulum?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have unlocked the secrets of pendulums through our expert courses
          </p>
          <button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg">
            Browse All Courses
          </button>
        </section>
      </main>

      <Footer />

      {selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

export default App;
