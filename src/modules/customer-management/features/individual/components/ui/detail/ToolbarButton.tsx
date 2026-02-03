'use client';
export default function ToolbarButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-5 py-2 text-sm font-medium transition ${
        active
          ? 'border-brand-500 bg-brand-50 text-brand-700'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]'
      }`}
    >
      {children}
    </button>
  );
}
