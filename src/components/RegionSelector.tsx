import React from 'react';
import { Globe } from 'lucide-react';
import type { TimeRegion } from '../types';

interface RegionSelectorProps {
  regions: TimeRegion[];
  selectedRegion: TimeRegion | null;
  onRegionSelect: (region: TimeRegion) => void;
}

export function RegionSelector({ regions, selectedRegion, onRegionSelect }: RegionSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Select Region</h2>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionSelect(region)}
            className={`p-3 rounded-md text-left transition-all ${
              selectedRegion?.id === region.id
                ? 'bg-blue-50 border-blue-500 border shadow-sm'
                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{region.name}</span>
              <span className="text-sm text-gray-600">
                UTC {region.offset >= 0 ? '+' : ''}{region.offset}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}