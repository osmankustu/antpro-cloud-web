import { useCustomerSharedEndpoints } from '@/modules/customer-management/hooks/useCustomerSharedEndpoints';
import { useEffect, useMemo, useState } from 'react';

export type State = {
  id: number;
  name: string;
  lat: number | null;
  lon: number | null;
};

export type City = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

interface UseCityStateSelectParams {
  defaultCityId?: number;
  defaultStateId?: number;
  onChange?: (data: { city?: City; state?: State }) => void;
}

export function useCityStateSelect({
  defaultCityId,
  defaultStateId,
  onChange,
}: UseCityStateSelectParams) {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedState, setSelectedState] = useState<State>();

  const { getCitiesAndStates } = useCustomerSharedEndpoints();

  const { data: cityData } = getCitiesAndStates(undefined);
  const { data: stateData } = getCitiesAndStates(selectedCity?.id);

  // Şehirleri yükle
  useEffect(() => {
    if (!cityData) return;

    setCities(cityData.items);

    if (defaultCityId) {
      const city = cityData.items.find((c: City) => c.id === defaultCityId);
      setSelectedCity(city);
    }
  }, [cityData]);

  // İlçeleri yükle
  useEffect(() => {
    if (!selectedCity || !stateData) {
      setStates([]);
      setSelectedState(undefined);
      return;
    }

    setStates(stateData.items);

    if (defaultStateId) {
      const state = stateData.items.find((s: State) => s.id === defaultStateId);
      setSelectedState(state);
    }
  }, [selectedCity?.id, stateData]);

  // 🔥 dışarı tam obje döner (lat / lon dahil)
  useEffect(() => {
    onChange?.({
      city: selectedCity,
      state: selectedState,
    });
  }, [selectedCity, selectedState]);

  const cityOptions = useMemo(() => cities, [cities]);
  const stateOptions = useMemo(() => states, [states]);

  return {
    cityOptions,
    stateOptions,
    selectedCity,
    selectedState,
    setSelectedCity,
    setSelectedState,
  };
}
