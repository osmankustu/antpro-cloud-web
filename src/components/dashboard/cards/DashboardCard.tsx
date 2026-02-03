import clsx from 'clsx';
import React from 'react';

interface DashboardStatCardProps {
  title: string;
  value?: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardStatCard({ title, value, icon, className }: DashboardStatCardProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all',
        'hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600">{icon}</div>
      )}

      {/* Content */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>

        <p className="text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
