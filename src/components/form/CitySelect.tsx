import { City, State, useCityStateSelect } from '@/hooks/useCityStateSelect';
import Select from 'react-select';

interface CitySelectProps {
  defaultCityId?: number;
  defaultStateId?: number;
  onChange?: (data: { city?: City; state?: State }) => void;
  className?: string;
}

export function CitySelect({
  defaultCityId,
  defaultStateId,
  onChange,
  className = '',
}: CitySelectProps) {
  const {
    cityOptions,
    stateOptions,
    selectedCity,
    selectedState,
    setSelectedCity,
    setSelectedState,
  } = useCityStateSelect({
    defaultCityId,
    defaultStateId,
    onChange,
  });

  return (
    <div className={className}>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Şehir</label>
        <Select<City>
          options={cityOptions}
          value={selectedCity ?? null}
          getOptionLabel={c => c.name}
          getOptionValue={c => String(c.id)}
          onChange={city => {
            setSelectedCity(city ?? undefined);
            setSelectedState(undefined); // şehir değişince ilçe reset
          }}
          placeholder="Şehir seçiniz"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">İlçe</label>
        <Select<State>
          options={stateOptions}
          value={selectedState ?? null}
          getOptionLabel={s => s.name}
          getOptionValue={s => String(s.id)}
          onChange={state => setSelectedState(state ?? undefined)}
          placeholder="İlçe seçiniz"
          isDisabled={!selectedCity}
        />
      </div>
    </div>
  );
}
