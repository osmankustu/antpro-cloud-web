import Select from 'react-select';
import { ServiceStatusDataSheet } from '../../constants/selectDataSheet';

interface ServiceStatusSelectPorps {
  onChange: (value?: string) => void;
  error?: boolean;
  value?: string;
}

export function ServiceStatusSelect({ onChange, error, value }: ServiceStatusSelectPorps) {
  return (
    <Select
      id="y"
      options={ServiceStatusDataSheet}
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: !!error ? 'red' : base.borderColor,
        }),
      }}
      getOptionLabel={e => e.label}
      getOptionValue={e => e.value}
      value={ServiceStatusDataSheet.find(e => e.value === value)}
      onChange={value => onChange(value?.value)}
      placeholder={'Servis Durumu Seçiniz...'}
    />
  );
}
