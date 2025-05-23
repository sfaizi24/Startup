# Header Component Migration Guide

## Overview
We've created a standardized `Header` component located at `src/components/Header.tsx` that can be used across all pages to ensure consistency and reduce code duplication.

## Header Component Features
- Responsive design (mobile and desktop)
- Authentication integration (login/logout/user display)
- Mobile menu with smooth animations
- Optional search functionality
- Customizable logo click behavior

## Props
- `showSearch?: boolean` - Whether to show the search bar (default: false)
- `onLogoClick?: () => void` - Custom function to execute when logo is clicked

## How to Migrate Each Page

### 1. Update imports
**Remove these imports:**
```typescript
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Search } from 'lucide-react';
import ProfessionalSearch from './components/ProfessionalSearch'; // if present
```

**Add this import:**
```typescript
import Header from '@/components/Header';
```

### 2. Remove old state variables
**Remove these from your component:**
```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // if present
const navLinkClasses = "...";
const mobileNavLinkClasses = "...";
const ctaButtonClasses = "...";
const mobileCtaButtonClasses = "...";
```

### 3. Remove auth destructuring (if not needed elsewhere)
**Change this:**
```typescript
const { currentUser, logout, loading } = useAuth();
```

**To this (if you only need loading):**
```typescript
const { loading } = useAuth();
```

### 4. Replace the entire header section
**Remove the entire header JSX block** (everything from `<header>` to `</AnimatePresence>`) and replace with:

**For pages WITHOUT search:**
```typescript
<Header />
```

**For pages WITH search (like homepage):**
```typescript
<Header showSearch={true} onLogoClick={handleLogoClick} />
```

### 5. Add custom logo click handler (if needed)
For pages like the homepage that need special behavior when the logo is clicked:
```typescript
const handleLogoClick = () => {
  // Your custom logic here
  setCurrentQuestionKey('initial');
  setUserAnswers({});
  setQuestionHistory([]);
};
```

## Pages to Update
- ✅ `/` (homepage) - Already updated
- ✅ `/about` - Already updated  
- 🔄 `/work-with-us/page.tsx`
- 🔄 `/faq/page.tsx`
- 🔄 `/professionals/[slug]/page.tsx`
- 🔄 `/results/1/page.tsx`
- 🔄 Any other pages with headers

## Example: Before and After

### Before:
```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ExamplePage() {
  const { currentUser, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ... lots of header JSX code ...
  
  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      <header>...</header>
      {/* Mobile menu overlay */}
      <AnimatePresence>...</AnimatePresence>
      {/* Rest of page content */}
    </div>
  );
}
```

### After:
```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

export default function ExamplePage() {
  const { loading } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen bg-brand-light-teal">
      <Header />
      {/* Rest of page content */}
    </div>
  );
}
```

## Benefits
- ✅ Reduced code duplication
- ✅ Consistent header across all pages
- ✅ Easier maintenance (update header in one place)
- ✅ Better type safety
- ✅ Cleaner, more readable page components 