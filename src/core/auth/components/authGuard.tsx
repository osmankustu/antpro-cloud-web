// components/AuthGuard.tsx
'use client';
import { RootState } from '@/core/store/base/rootStore';
import { useRouter } from 'next/navigation'; // Next 13 app router
import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface AuthGuardProps {
  children: ReactNode;
  role?: string; // Optional role-based access
}

const AuthGuard: FC<AuthGuardProps> = ({ children, role }) => {
  const router = useRouter();
  const { token, user, roles } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      // Eğer giriş yapılmamışsa login sayfasına yönlendir
      router.replace('/auth/login');
    } else if (role && roles && !roles.includes(role)) {
      // Role kontrolü varsa ve yetkisi yoksa
      router.replace('/auth/unauthorized');
    }
  }, [token, user, role, router]);

  if (!token || (role && roles && !roles.includes(role))) {
    return null; // Yönlendirme gerçekleşene kadar sayfayı render etme
  }

  return <>{children}</>;
};

export default AuthGuard;
