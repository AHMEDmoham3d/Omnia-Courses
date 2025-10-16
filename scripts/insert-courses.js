import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateCourses() {
  // Update the pendulum course title to "Whispers of the pendulum" and image to pal.png
  const { data, error } = await supabase
    .from('courses')
    .update({ title: "Whispers of the pendulum", image_url: "/pal.png" })
    .eq('category', 'Pendulum')
    .select();

  if (error) {
    console.error('Error updating course:', error);
  } else {
    console.log('Updated course successfully:', data);
  }

  // Insert other courses if needed
  const courses = [
    {
      title: "Tarot Card Reading Mastery",
      description: "Dive deep into the world of Tarot, learning card meanings, spreads, and intuitive reading techniques for personal growth.",
      short_description: "Unlock the secrets of Tarot cards and become a confident reader.",
      price: 59.99,
      duration: "6 hours",
      level: "Intermediate",
      image_url: "https://images.unsplash.com/photo-1578631610676-7e006a85c5c9?w=800&h=600&fit=crop",
      instructor_name: "Mystic Aria Thorne",
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
      title: "Energy Healing Sessions with Crystals",
      description: "Explore crystal healing therapies, chakra balancing, and energy work sessions to promote wellness and harmony.",
      short_description: "Discover the power of crystals for healing and energy alignment.",
      price: 39.99,
      duration: "3 hours",
      level: "Beginner",
      image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      instructor_name: "Healing Master Luna",
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

  try {
    for (const course of courses) {
      const { data, error } = await supabase
        .from('courses')
        .insert([course])
        .select();

      if (error) {
        console.error('Error inserting course:', course.title, error);
      } else {
        console.log('Inserted course:', course.title);
      }
    }
    console.log('All courses inserted successfully!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

updateCourses();
