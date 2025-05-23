'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  slug: string;
  specialties: string[];
}

// Mock data for professionals
const mockProfessionals: Professional[] = [
  { id: '1', name: 'Dr. Aisha Khan', slug: 'dr-aisha-khan', specialties: ['Anxiety', 'Depression'] },
  { id: '2', name: 'Dr. Omar Ibrahim', slug: 'dr-omar-ibrahim', specialties: ['Family Therapy', 'Couples Counseling'] },
  { id: '3', name: 'Sister Fatima Ahmed', slug: 'fatima-ahmed', specialties: ['Stress Management', 'Mindfulness'] },
  { id: '4', name: 'Dr. Ali Hassan', slug: 'dr-ali-hassan', specialties: ['Child Psychology', 'ADHD'] },
  { id: '5', name: 'Sheikh Yusuf Mohamed', slug: 'sheikh-yusuf-mohamed', specialties: ['Islamic Counseling', 'Grief'] },
];

const ProfessionalSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Professional[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = mockProfessionals.filter(prof => 
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (professional: Professional) => {
    setSearchQuery(professional.name); // Optional: fill input with name
    setShowSuggestions(false);
    router.push(`/professionals/${professional.slug}`);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length === 1) {
      // If only one suggestion, navigate to it
      handleSuggestionClick(suggestions[0]);
    } else if (suggestions.length > 1) {
      // If multiple suggestions, user might want to pick one from list
      // Or, we could navigate to a search results page if one existed
      // For now, just keep suggestions open if user presses enter with multiple.
      setShowSuggestions(true);
    }
    // If no suggestions and user presses enter, do nothing or show "no results"
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-6" ref={searchContainerRef}>
      <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search by name or specialty (e.g., Dr. Aisha, Anxiety)"
            className="w-full px-4 py-3 pr-16 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-colors duration-300"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-0 bottom-0 px-3 py-3 text-gray-500 hover:text-brand-dark-blue focus:outline-none flex items-center justify-center"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-4 py-3 bg-brand-teal text-white rounded-r-lg hover:bg-brand-dark-teal focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-1 transition-colors duration-300 flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((prof) => (
            <li
              key={prof.id}
              onClick={() => handleSuggestionClick(prof)}
              className="px-4 py-3 hover:bg-brand-light-teal cursor-pointer transition-colors duration-150"
            >
              <p className="font-semibold text-brand-dark-blue">{prof.name}</p>
              <p className="text-sm text-gray-600">{prof.specialties.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && suggestions.length === 0 && searchQuery.trim() !== '' && (
         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center">
            <p className="text-gray-600">No professionals found matching &quot;{searchQuery}&quot;.</p>
         </div>
      )}
    </div>
  );
};

export default ProfessionalSearch; 