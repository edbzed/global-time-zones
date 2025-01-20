import React, { useEffect, useState, useRef } from 'react';
import { Clock, Globe2, Search, ArrowLeftRight } from 'lucide-react';
import type { TimeRegion } from '../types';

interface TimeDisplayProps {
  regions: TimeRegion[];
}

export function TimeDisplay({ regions }: TimeDisplayProps) {
  const [times, setTimes] = useState<Record<string, Date>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<TimeRegion | null>(null);
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const newTimes = regions.reduce((acc, region) => {
        const localTime = new Date();
        const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
        acc[region.id] = new Date(utcTime + (region.offset * 3600000));
        return acc;
      }, {} as Record<string, Date>);
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [regions]);

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedRegions = filteredRegions.reduce((acc, region) => {
    const offset = region.offset;
    if (!acc[offset]) {
      acc[offset] = [];
    }
    acc[offset].push(region);
    return acc;
  }, {} as Record<number, TimeRegion[]>);

  const sortedOffsets = Object.keys(groupedRegions)
    .map(Number)
    .sort((a, b) => a - b);

  const handleRegionClick = (region: TimeRegion) => {
    setSelectedRegion(region);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleResetMainTime = () => {
    setSelectedRegion(null);
  };

  const getMainTimeDisplay = () => {
    if (selectedRegion) {
      return {
        name: selectedRegion.name,
        time: times[selectedRegion.id],
        timeZone: `UTC${selectedRegion.offset >= 0 ? '+' : ''}${selectedRegion.offset}`,
      };
    }
    return {
      name: 'Local Time',
      time: new Date(),
      timeZone: localTimeZone,
    };
  };

  const mainTime = getMainTimeDisplay();

  return (
    <div className="space-y-4 sm:space-y-8">
      <div ref={topRef} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden group">
        <div className="p-4 sm:p-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 relative">
          {selectedRegion && (
            <button
              onClick={handleResetMainTime}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="Switch back to local time"
            >
              <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          )}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
                {mainTime.name}
              </h2>
            </div>
            <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 rounded-lg">
              <span className="font-mono text-sm sm:text-base text-white">
                {mainTime.timeZone}
              </span>
            </div>
          </div>
          <div className="font-mono text-3xl sm:text-5xl text-white">
            {mainTime.time?.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search cities..."
          className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6 sm:space-y-8">
        {sortedOffsets.map((offset) => (
          <div key={offset} className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
                UTC {offset >= 0 ? '+' : ''}{offset}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {groupedRegions[offset].map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region)}
                  className={`
                    relative p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left
                    ${activeRegion === region.id 
                      ? 'border-blue-500 shadow-md sm:shadow-lg scale-[1.01] sm:scale-[1.02]' 
                      : 'border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-400 hover:shadow-sm sm:hover:shadow-md'
                    }
                    ${selectedRegion?.id === region.id
                      ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                      : ''
                    }
                  `}
                  onMouseEnter={() => setActiveRegion(region.id)}
                  onMouseLeave={() => setActiveRegion(null)}
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                      {region.name}
                    </h4>
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl text-gray-800 dark:text-gray-100">
                    {times[region.id]?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {times[region.id]?.toLocaleDateString([], {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}