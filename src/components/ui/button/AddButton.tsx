import { ReactNode } from 'react';
import Button from './Button';
import { FcPlus } from 'react-icons/fc';

interface AddButtonProps {
  children: ReactNode; // Button text or content
  size?: 'sm' | 'md'; // Button size
  variant?: 'primary' | 'outline'; // Button variant
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const AddButton = ({ children, className, disabled, onClick, size, variant }: AddButtonProps) => {
  return (
    <Button
      children={children}
      className={className}
      disabled={disabled}
      startIcon={<FcPlus size={25} />}
      onClick={onClick}
      size={size}
      variant={variant}
    />
  );
};

export default AddButton;
