// src/core/ui/GlobalLoader.tsx
'use client';

export default function GlobalLoader() {
  const isLoading = false;

  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white border-t-blue-600" />
    </div>
  );
}
