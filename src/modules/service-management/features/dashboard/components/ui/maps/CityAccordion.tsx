'use client';

import { OpenServiceModel } from '@/modules/service-management/types/dashboard.types';
import { useState } from 'react';

interface CityAccordionProps {
  cities?: OpenServiceModel[];
  onSelectDistrict: (lat: number, lon: number) => void;
}

export function CityAccordion({ cities, onSelectDistrict }: CityAccordionProps) {
  const [openCity, setOpenCity] = useState<string | null>(null);

  function toggleCity(cityName: string) {
    setOpenCity(prev => (prev === cityName ? null : cityName));
  }

  return (
    <div className="h-[500px] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      {cities?.map(city => {
        const isOpen = openCity === city.name;

        return (
          <div key={city.name} className="mb-3">
            {/* City Header */}
            <button
              onClick={() => toggleCity(city.name)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span>
                {city.name}
                <span className="ml-2 text-xs text-gray-500">({city.totalServiceCount})</span>
              </span>

              <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
            </button>

            {/* District List */}
            {isOpen && (
              <ul className="mt-2 space-y-1">
                {city.states.map(state => (
                  <li
                    key={state.name}
                    onClick={() => onSelectDistrict(state.lat, state.lon)}
                    className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <span>{state.name}</span>
                    <span className="text-xs font-medium text-blue-600">{state.serviceCount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
