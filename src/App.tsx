import React from 'react';
import { TimeDisplay } from './components/TimeDisplay';
import { Globe, Moon, Sun } from 'lucide-react';
import type { TimeRegion } from './types';
import { useTheme } from './context/ThemeContext';

const regions: TimeRegion[] = [
  // North America
  { id: 'us-east', name: 'New York (EST)', offset: -5 },
  { id: 'us-central', name: 'Chicago (CST)', offset: -6 },
  { id: 'us-mountain', name: 'Denver (MST)', offset: -7 },
  { id: 'us-west', name: 'Los Angeles (PST)', offset: -8 },
  { id: 'ca-east', name: 'Toronto (EST)', offset: -5 },
  { id: 'ca-west', name: 'Vancouver (PST)', offset: -8 },
  { id: 'mx-city', name: 'Mexico City (CST)', offset: -6 },
  
  // South America
  { id: 'br-sao', name: 'São Paulo (BRT)', offset: -3 },
  { id: 'ar-buenos', name: 'Buenos Aires (ART)', offset: -3 },
  { id: 'cl-santiago', name: 'Santiago (CLT)', offset: -4 },
  { id: 'pe-lima', name: 'Lima (PET)', offset: -5 },
  
  // Europe
  { id: 'eu-london', name: 'London (GMT)', offset: 0 },
  { id: 'eu-paris', name: 'Paris (CET)', offset: 1 },
  { id: 'eu-berlin', name: 'Berlin (CET)', offset: 1 },
  { id: 'eu-athens', name: 'Athens (EET)', offset: 2 },
  { id: 'eu-moscow', name: 'Moscow (MSK)', offset: 3 },
  { id: 'eu-istanbul', name: 'Istanbul (TRT)', offset: 3 },
  
  // Middle East & Africa
  { id: 'ae-dubai', name: 'Dubai (GST)', offset: 4 },
  { id: 'sa-riyadh', name: 'Riyadh (AST)', offset: 3 },
  { id: 'ke-nairobi', name: 'Nairobi (EAT)', offset: 3 },
  { id: 'za-johannesburg', name: 'Johannesburg (SAST)', offset: 2 },
  
  // Asia
  { id: 'in-mumbai', name: 'Mumbai (IST)', offset: 5.5 },
  { id: 'bd-dhaka', name: 'Dhaka (BST)', offset: 6 },
  { id: 'th-bangkok', name: 'Bangkok (ICT)', offset: 7 },
  { id: 'cn-beijing', name: 'Beijing (CST)', offset: 8 },
  { id: 'sg-singapore', name: 'Singapore (SGT)', offset: 8 },
  { id: 'hk-hongkong', name: 'Hong Kong (HKT)', offset: 8 },
  { id: 'kr-seoul', name: 'Seoul (KST)', offset: 9 },
  { id: 'jp-tokyo', name: 'Tokyo (JST)', offset: 9 },
  
  // Oceania
  { id: 'au-perth', name: 'Perth (AWST)', offset: 8 },
  { id: 'au-adelaide', name: 'Adelaide (ACST)', offset: 9.5 },
  { id: 'au-sydney', name: 'Sydney (AEST)', offset: 10 },
  { id: 'nz-auckland', name: 'Auckland (NZST)', offset: 12 }
];

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200 flex flex-col">
      <div className="container mx-auto px-4 py-6 sm:py-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-6 sm:mb-12">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400 mr-3 sm:mr-4" />
              <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Global Time Zones
              </h1>
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real-time time zone comparison across major global regions, 
              helping you coordinate across borders and time zones
            </p>
            <button
              onClick={toggleTheme}
              className="mt-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </header>
          
          <TimeDisplay regions={regions} />
        </div>
      </div>
      
      <footer className="py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>Copyright © 2025 Ed Bates (TECHBLIP LLC)</p>
            <p>This software is released under the Apache-2.0 License. See the LICENSE file for details</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;