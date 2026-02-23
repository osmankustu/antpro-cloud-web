import ToolbarButton from '@/components/ui/button/ToolbarButton';
import { FaChevronLeft } from 'react-icons/fa';

interface DocumentsToolbarProps {
  onHide: () => void;
  isSelected?: boolean;
  title: string;
}

export function DocumentToolbar({ onHide, isSelected, title }: DocumentsToolbarProps) {
  return (
    <div className="dark:bg-white/[0.03]mb-4 mb-5 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
        <div className="relative w-full sm:w-auto"></div>
      </div>

      <div className="w-full sm:w-auto">
        {isSelected && (
          <ToolbarButton children={<FaChevronLeft size={15} />} onClick={() => onHide()} />
        )}
      </div>
    </div>
  );
}
