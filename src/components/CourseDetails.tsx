import { X, Star, Clock, Users, Award, PlayCircle, CheckCircle, BookOpen } from 'lucide-react';
import { Course } from '../lib/supabase';

type CourseDetailsProps = {
  course: Course;
  onClose: () => void;
};

export function CourseDetails({ course, onClose }: CourseDetailsProps) {
  const features = [
    'Lifetime access to course materials',
    'Certificate of completion',
    'Direct instructor support',
    'Private community access',
    'Bonus resources and materials',
    'Mobile and desktop access',
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-10">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-2xl font-bold text-slate-900">Course Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
            >
              <X size={24} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="relative h-80 overflow-hidden">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold">
                {course.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold">
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-white/80">rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={18} />
                <span>{course.enrollment_count} students enrolled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={18} />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <section className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">About This Course</h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {course.description}
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-indigo-600" size={28} />
                  What You'll Learn
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                      <CheckCircle size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="text-indigo-600" size={28} />
                  Course Curriculum
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((module) => (
                    <div key={module} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {module}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">Module {module}: Foundation & Basics</h4>
                          <p className="text-sm text-slate-600">6 lessons • 2 hours</p>
                        </div>
                        <PlayCircle className="text-indigo-600" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Instructor</h3>
                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                  <img
                    src={course.instructor_image}
                    alt={course.instructor_name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{course.instructor_name}</h4>
                    <p className="text-slate-700 leading-relaxed">{course.instructor_bio}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">${course.price}</div>
                    <p className="text-indigo-100">One-time payment</p>
                  </div>

                  <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 shadow-lg mb-4">
                    Enroll Now
                  </button>

                  <button className="w-full border-2 border-white text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors duration-200 mb-6">
                    Add to Wishlist
                  </button>

                  <div className="space-y-4 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3">
                      <Clock className="flex-shrink-0" size={20} />
                      <div>
                        <div className="font-semibold">Duration</div>
                        <div className="text-indigo-100 text-sm">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="flex-shrink-0" size={20} />
                      <div>
                        <div className="font-semibold">Students</div>
                        <div className="text-indigo-100 text-sm">{course.enrollment_count} enrolled</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="flex-shrink-0" size={20} />
                      <div>
                        <div className="font-semibold">Certificate</div>
                        <div className="text-indigo-100 text-sm">Upon completion</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="flex-shrink-0 fill-white" size={20} />
                      <div>
                        <div className="font-semibold">Rating</div>
                        <div className="text-indigo-100 text-sm">{course.rating}/5 stars</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
