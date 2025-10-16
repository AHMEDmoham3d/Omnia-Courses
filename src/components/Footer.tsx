import { Sparkles, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">OMNIA</div>
                <div className="text-xs text-indigo-300 -mt-1">Academy</div>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              Transform your life through spiritual wisdom and ancient practices.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">All Courses</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Featured</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Instructors</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Become Instructor</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Energy Healing</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Tarot Reading</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Crystal Healing</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Astrology</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Reiki</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300">
                <Mail size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>contact@omnia-academy.com</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Phone size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>123 Spiritual Way, Mystic City, MC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>&copy; 2025 Omnia Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
