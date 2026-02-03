import { ReactNode } from 'react';
import Button from './Button';
import { FcFilledFilter } from 'react-icons/fc';

interface FilterButtonProps {
  children: ReactNode; // Button text or content
  size?: 'sm' | 'md'; // Button size
  variant?: 'primary' | 'outline'; // Button variant
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const FilterButton = ({
  children,
  className,
  disabled,
  onClick,
  size,
  variant,
}: FilterButtonProps) => {
  return (
    <Button
      children={children}
      className={className}
      disabled={disabled}
      startIcon={<FcFilledFilter size={25} />}
      onClick={onClick}
      size={size}
      variant={variant}
    />
  );
};

export default FilterButton;
