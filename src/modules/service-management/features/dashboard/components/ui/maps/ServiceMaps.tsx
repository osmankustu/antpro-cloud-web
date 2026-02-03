'use client';

import Button from '@/components/ui/button/Button';
import { OpenServiceModel } from '@/modules/service-management/types/dashboard.types';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';

interface ServiceMapProps {
  cities?: OpenServiceModel[];
}

export function ServiceMap({ cities = [] }: ServiceMapProps) {
  const router = useRouter();
  const mapRef = useRef<null>(null);
  const [openCity, setOpenCity] = useState<string | null>(null);

  function flyTo(lat: number, lon: number, zoom = 11) {
    if (!mapRef.current) return;

    mapRef.current.flyTo([lat, lon], zoom, {
      animate: true,
      duration: 0.6,
    });
  }

  return (
    <div className="grid grid-cols-12 gap-4 rounded-xl border border-2 border-gray-200 p-5 dark:border-gray-800">
      {/* CITY / STATE LIST */}
      <div className="col-span-4 space-y-2">
        {cities.map(city => (
          <div key={city.name} className="rounded-xl border border-gray-200 dark:border-gray-800">
            {/* CITY HEADER */}
            <button
              className="flex w-full items-center justify-between px-4 py-3"
              onClick={() => {
                setOpenCity(prev => (prev === city.name ? null : city.name));
                flyTo(city.lat, city.lon, 8);
              }}
            >
              <div>
                <p className="font-medium">{city.name}</p>
                <p className="text-xs text-gray-500">{city.totalServiceCount} servis</p>
              </div>
              <span className="text-sm text-gray-400">{openCity === city.name ? '−' : '+'}</span>
            </button>

            {/* STATE LIST */}
            {openCity === city.name && (
              <div className="border-t">
                {city.states.map(state => (
                  <button
                    key={state.name}
                    onClick={() => flyTo(state.lat, state.lon)}
                    className="flex w-full items-center justify-between px-6 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <span>{state.name}</span>
                    <span className="text-xs text-gray-500">{state.serviceCount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MAP */}
      <div className="col-span-8">
        <MapContainer
          center={[36.883, 30.65]}
          zoom={7}
          className="h-[500px] w-full rounded-2xl"
          whenCreated={map => (mapRef.current = map)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {cities.map(city =>
            city.states.map(state => (
              <Circle
                key={`${city.name}-${state.name}`}
                center={[state.lat, state.lon]}
                radius={Math.max(state.serviceCount * 400, 300)}
                pathOptions={{
                  color: '#2563eb',
                  fillColor: '#3b82f6',
                  fillOpacity: 0.35,
                }}
              >
                <Popup>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">{state.name}</p>
                    <p>{state.serviceCount} servis</p>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/servicerecords?filter=district:${state.name}`)}
                    >
                      Servislere Git
                    </Button>
                  </div>
                </Popup>
              </Circle>
            )),
          )}
        </MapContainer>
      </div>
    </div>
  );
}
