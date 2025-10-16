import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Course = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  duration: string;
  level: string;
  image_url: string;
  instructor_name: string;
  instructor_bio: string;
  instructor_image: string;
  category: string;
  is_featured: boolean;
  enrollment_count: number;
  rating: number;
  created_at: string;
  updated_at: string;
};

export type CourseModule = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
};

export type CourseLesson = {
  id: string;
  module_id: string;
  title: string;
  content: string;
  video_url: string;
  duration: string;
  order_index: number;
  created_at: string;
};
