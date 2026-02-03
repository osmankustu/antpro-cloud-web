import Select from 'react-select';
import { PriortyDataSheet } from '../../constants/priorityDataSheet';

interface PrioritySelectPorps {
  onChange: (value?: string) => void;
  error?: boolean;
  value?: string;
}

export function PrioritySelect({ onChange, error, value }: PrioritySelectPorps) {
  return (
    <Select
      id="y"
      options={PriortyDataSheet}
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: !!error ? 'red' : base.borderColor,
        }),
      }}
      getOptionLabel={e => e.label}
      getOptionValue={e => e.value}
      value={PriortyDataSheet.find(e => e.value === value)}
      onChange={value => onChange(value?.value)}
      placeholder={'Öncelik Durumu Seçiniz...'}
    />
  );
}
