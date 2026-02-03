'use client';

import { useEffect, useState } from 'react';

interface UserHelloCardProps {
  userName?: string;
}

export function UserHelloCard({ userName = 'Hoş geldin' }: UserHelloCardProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200_000); // 1 dakika

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        👋 Merhaba {userName}
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Bugün yapacak harika işlerimiz var 🚀
      </p>
    </div>
  );
}
