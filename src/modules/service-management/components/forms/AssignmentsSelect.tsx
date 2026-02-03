import { BaseEmployee } from '@/core/model/baseEmployee';
import React, { useState } from 'react';
import Select from 'react-select';

type Option = {
  value: string;
  label: string;
};

type AssignmentType = 'personel' | 'team' | 'none';

type Props = {
  personnelList?: BaseEmployee[];
  teamList?: BaseEmployee[];
  onChange: (selectedId: string | null, selectedType: AssignmentType) => void;
  defaultType?: AssignmentType;
  defaultId?: string;
};

export const AssignmentSelect: React.FC<Props> = ({
  personnelList,
  teamList,
  onChange,
  defaultType = 'none',
  defaultId,
}) => {
  const [type, setType] = useState<AssignmentType>(defaultType);
  const [selectedId, setSelectedId] = useState<string | null>(defaultId ?? null);

  const handleTypeChange = (newType: AssignmentType) => {
    setType(newType);
    setSelectedId(null);
    onChange(null, newType);
  };

  const handleSelectChange = (option: Option | null) => {
    const id = option?.value ?? null;
    setSelectedId(id);
    onChange(id, type);
  };

  const getOptions = (): Option[] | undefined => {
    if (type === 'personel') {
      return personnelList?.map(
        p =>
          ({
            value: p?.id,
            label: p.fullName,
          }) as Option,
      );
    } else if (type === 'team') {
      return teamList?.map(t => ({ value: t?.id, label: t?.fullName }) as Option);
    }
    return [];
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="assignmentType"
            value="personel"
            checked={type === 'personel'}
            onChange={() => handleTypeChange('personel')}
          />
          Personel
        </label>
        <label>
          <input
            type="radio"
            name="assignmentType"
            value="team"
            checked={type === 'team'}
            onChange={() => handleTypeChange('team')}
          />
          Ekip
        </label>
        <label>
          <input
            type="radio"
            name="assignmentType"
            value="none"
            checked={type === 'none'}
            onChange={() => handleTypeChange('none')}
          />
          Atama Yok
        </label>
      </div>

      {type !== 'none' ? (
        <Select
          options={getOptions()}
          value={getOptions()?.find(opt => opt.value === selectedId) || null}
          onChange={handleSelectChange}
          isClearable
          placeholder={`Bir ${type === 'personel' ? 'personel' : 'ekip'} seçin`}
        />
      ) : (
        <div className="text-gray-500 italic">Herhangi bir atama yapılmadı.</div>
      )}
    </div>
  );
};
