import React from 'react';

export default function FormGrid({ children }: { children: React.ReactNode }) {
  const count = React.Children.count(children);

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
        count === 1 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'
      }`}
    >
      {children}
    </div>
  );
}
