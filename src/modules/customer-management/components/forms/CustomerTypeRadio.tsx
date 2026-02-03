const CustomerTypeRadio = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 dark:text-gray-400">
      <input type="radio" checked={checked} onChange={onChange} className="accent-brand-500" />
      {label}
    </label>
  );
};

export default CustomerTypeRadio;
