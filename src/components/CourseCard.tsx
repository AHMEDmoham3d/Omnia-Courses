import { Star, Clock, Users, TrendingUp, Award } from 'lucide-react';
import { Course } from '../lib/supabase';

type CourseCardProps = {
  course: Course;
  onClick: (course: Course) => void;
};

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <div
      onClick={() => onClick(course)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {course.is_featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
            <TrendingUp size={16} />
            Featured
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-slate-800 shadow-lg">
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          {course.category}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
          {course.title}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {course.short_description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <img
            src="/main.jpeg"
            alt="structure"
            className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100"
          />
          <span className="text-sm text-slate-700 font-medium">
            {course.instructor_name}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-indigo-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-indigo-500" />
            <span>{course.enrollment_count} students</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-900">{course.rating}</span>
            <span className="text-slate-500 text-sm">/5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award size={18} className="text-indigo-500" />
            <span className="text-sm text-slate-700 font-medium">Certificate</span>
          </div>
        </div>


      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-300 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
