import { useEffect, useState } from 'react';

interface AddressCheckboxProps {
  value?: string;
  onChange: (type: string) => void;
}

export function AddressCheckbox({ value = 'regist', onChange }: AddressCheckboxProps) {
  const [type, setType] = useState<string>(value);

  useEffect(() => {
    setType(value);
  }, [value]);

  const handleChange = (type: string) => {
    setType(type);
    onChange(type);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 dark:text-gray-400">
          <input type="radio" checked={type === 'regist'} onChange={() => handleChange('regist')} />
          Kayıtlı Adres
        </label>
        <label className="flex items-center gap-2 dark:text-gray-400">
          <input type="radio" checked={type === 'new'} onChange={() => handleChange('new')} />
          Yeni Adres
        </label>
      </div>
    </div>
  );
}
