import Button from '@/components/ui/button/Button';
import { BaseAddress } from '@/modules/customer-management/types/base/baseAddress';
import { useState } from 'react';
import Select from 'react-select';

import { useEffect } from 'react';

interface AddressSelectProps {
  addresses?: BaseAddress[];
  onChange?: (address: BaseAddress | null) => void;
  disabled?: boolean;
  onClick: () => void;
  defaultAddressId?: string;
}

export function AddressSelect({
  addresses = [],
  onChange,
  disabled,
  onClick,
  defaultAddressId,
}: AddressSelectProps) {
  const [selectedAddress, setSelectedAddress] = useState<BaseAddress | null>(null);

  // 🔥 default value sync
  useEffect(() => {
    if (!defaultAddressId || !addresses.length) return;

    const defaultAddress = addresses.find(a => a.id === defaultAddressId) ?? null;
    setSelectedAddress(defaultAddress);
    onChange?.(defaultAddress);
  }, [defaultAddressId, addresses]);

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <Select<BaseAddress>
          placeholder={disabled ? 'Önce Müşteri Seçiniz...' : 'Müşteri Adresi Seçiniz...'}
          options={addresses}
          value={selectedAddress}
          isDisabled={disabled}
          getOptionLabel={e => `${e.title} - ${e.addressLine} ${e.city}/${e.state} ${e.postalCode}`}
          getOptionValue={e => String(e.id)}
          onChange={value => {
            setSelectedAddress(value);
            onChange?.(value);
          }}
        />
      </div>

      <Button disabled={disabled} size="sm" onClick={onClick}>
        Adres Ekle
      </Button>
    </div>
  );
}
