import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tixxvcxcrgxscmprldmi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzA5MzksImV4cCI6MjA2OTA0NjkzOX0.bhWFkJAMPAnEf9c1rRjEbyYG4XjQnOIP2dsVVeK_H3U';

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
