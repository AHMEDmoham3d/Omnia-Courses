/*
  # Create Courses Management System

  ## Summary
  This migration creates a comprehensive database schema for managing online courses, 
  designed to work with the Omnia spiritual energy platform.

  ## New Tables Created
  
  ### 1. `courses`
  Main courses table containing all course information:
  - `id` (uuid, primary key) - Unique course identifier
  - `title` (text) - Course title
  - `description` (text) - Detailed course description
  - `short_description` (text) - Brief overview for cards
  - `price` (numeric) - Course price
  - `duration` (text) - Course duration (e.g., "4 weeks", "10 hours")
  - `level` (text) - Course level (beginner, intermediate, advanced)
  - `image_url` (text) - Course cover image URL
  - `instructor_name` (text) - Instructor name
  - `instructor_bio` (text) - Instructor biography
  - `instructor_image` (text) - Instructor photo URL
  - `category` (text) - Course category
  - `is_featured` (boolean) - Featured course flag
  - `enrollment_count` (integer) - Number of enrolled students
  - `rating` (numeric) - Average course rating
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `course_modules`
  Course curriculum structure:
  - `id` (uuid, primary key) - Module identifier
  - `course_id` (uuid, foreign key) - Reference to courses table
  - `title` (text) - Module title
  - `description` (text) - Module description
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `course_lessons`
  Individual lessons within modules:
  - `id` (uuid, primary key) - Lesson identifier
  - `module_id` (uuid, foreign key) - Reference to course_modules
  - `title` (text) - Lesson title
  - `content` (text) - Lesson content/description
  - `video_url` (text) - Video lesson URL
  - `duration` (text) - Lesson duration
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. `enrollments`
  Student course enrollments:
  - `id` (uuid, primary key) - Enrollment identifier
  - `user_id` (uuid) - Reference to auth.users
  - `course_id` (uuid, foreign key) - Reference to courses
  - `enrolled_at` (timestamptz) - Enrollment timestamp
  - `progress` (integer) - Completion percentage (0-100)
  - `completed_at` (timestamptz) - Completion timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for courses, modules, and lessons
  - Authenticated users can view their own enrollments
  - Insert policies for authenticated users to enroll in courses

  ## Important Notes
  - All tables use UUID primary keys with automatic generation
  - Timestamps are automatically managed
  - Foreign key constraints ensure data integrity
  - Indexes added for performance optimization
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  duration text NOT NULL,
  level text NOT NULL DEFAULT 'beginner',
  image_url text,
  instructor_name text NOT NULL,
  instructor_bio text,
  instructor_image text,
  category text NOT NULL,
  is_featured boolean DEFAULT false,
  enrollment_count integer DEFAULT 0,
  rating numeric(3, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create course_lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  video_url text,
  duration text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0,
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses (public read)
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO public
  USING (true);

-- RLS Policies for course_modules (public read)
CREATE POLICY "Anyone can view course modules"
  ON course_modules FOR SELECT
  TO public
  USING (true);

-- RLS Policies for course_lessons (public read)
CREATE POLICY "Anyone can view course lessons"
  ON course_lessons FOR SELECT
  TO public
  USING (true);

-- RLS Policies for enrollments (authenticated users)
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
  ON enrollments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(is_featured);
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_module_id ON course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);

-- Insert sample courses
INSERT INTO courses (title, description, short_description, price, duration, level, image_url, instructor_name, instructor_bio, instructor_image, category, is_featured, rating)
VALUES 
(
  'Spiritual Energy Healing - Complete Guide',
  'Dive deep into the world of spiritual energy healing. Learn ancient techniques combined with modern practices to balance your chakras, cleanse your aura, and connect with universal energy. This comprehensive course covers everything from basic energy awareness to advanced healing methods.',
  'Master the art of spiritual energy healing and transform your life through ancient wisdom.',
  299.99,
  '8 weeks',
  'beginner',
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
  'Omnia Masters',
  'Expert spiritual guide with over 15 years of experience in energy healing and mystical practices.',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  'Energy Healing',
  true,
  4.9
),
(
  'Tarot Reading Mastery',
  'Unlock the mysteries of tarot cards and develop your intuitive abilities. This course takes you from beginner to advanced reader, covering card meanings, spreads, intuitive development, and professional reading techniques. Perfect for those seeking to understand tarot deeply.',
  'Learn to read tarot cards professionally and unlock your intuitive wisdom.',
  249.99,
  '6 weeks',
  'intermediate',
  'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg',
  'Luna Mystic',
  'Renowned tarot reader and spiritual teacher with a gift for making ancient wisdom accessible.',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  'Tarot & Divination',
  true,
  4.8
),
(
  'Crystal Healing & Meditation',
  'Discover the powerful healing properties of crystals and how to incorporate them into your meditation practice. Learn crystal selection, cleansing, programming, and creating crystal grids for manifestation and healing.',
  'Harness the power of crystals to enhance your spiritual journey and well-being.',
  199.99,
  '4 weeks',
  'beginner',
  'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg',
  'Crystal Dawn',
  'Crystal healer and meditation expert helping thousands find balance through stone medicine.',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  'Crystal Healing',
  false,
  4.7
),
(
  'Advanced Chakra Balancing',
  'Take your energy work to the next level with advanced chakra balancing techniques. Explore the subtle energy system, learn to identify and clear blockages, and master techniques for maintaining energetic harmony.',
  'Advanced techniques for mastering your chakra system and energy flow.',
  349.99,
  '10 weeks',
  'advanced',
  'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg',
  'Master Zen',
  'International energy master specializing in chakra work and kundalini awakening.',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  'Energy Healing',
  false,
  4.9
),
(
  'Astrology & Life Path Reading',
  'Understand yourself and others through the wisdom of astrology. Learn to read birth charts, understand planetary influences, and use astrological insights for personal growth and guidance.',
  'Navigate your life path with the ancient wisdom of astrology.',
  279.99,
  '8 weeks',
  'intermediate',
  'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg',
  'Star Weaver',
  'Professional astrologer helping people align with their cosmic blueprint.',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
  'Astrology',
  true,
  4.8
),
(
  'Reiki Level I & II Certification',
  'Begin your journey as a certified Reiki practitioner. Learn the history, principles, and practice of Reiki healing. Receive attunements and practice hands-on healing techniques.',
  'Become a certified Reiki practitioner and channel universal life force energy.',
  399.99,
  '6 weeks',
  'beginner',
  'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg',
  'Reiki Master Kai',
  'Certified Reiki Master Teacher with lineage tracing back to Dr. Usui.',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'Energy Healing',
  false,
  5.0
);
