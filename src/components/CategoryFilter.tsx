import { Sparkles, Heart, Gem, Star, Moon, Flame } from 'lucide-react';

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const categoryIcons: Record<string, React.ReactNode> = {
  'All': <Sparkles size={20} />,
  'Energy Healing': <Flame size={20} />,
  'Tarot & Divination': <Star size={20} />,
  'Crystal Healing': <Gem size={20} />,
  'Astrology': <Moon size={20} />,
  'Reiki': <Heart size={20} />,
};

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
              ${isSelected
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300'
              }
            `}
          >
            {categoryIcons[category] || <Sparkles size={20} />}
            {category}
          </button>
        );
      })}
    </div>
  );
}
