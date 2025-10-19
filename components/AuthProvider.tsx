'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type AuthContextType = {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean) => void;
  triggerAuthUpdate: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  triggerAuthUpdate: () => {},
  loading: true,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const triggerAuthUpdate = () => {
    setLoading(true);
    checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (loading || isLoggedIn === null) return;

    const onLoginPages = ['/login', '/register'].includes(pathname);

    // Redirige un utilisateur NON connecté s'il tente d'accéder à /order
    if (!isLoggedIn && pathname === '/order') {
      router.replace('/login');
    }

    // Redirige un utilisateur CONNECTÉ s'il tente d'accéder à /login ou /register
    else if (isLoggedIn && onLoginPages) {
      router.replace('/order');
    }
  }, [pathname, isLoggedIn, loading]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, triggerAuthUpdate, loading }}>
      {isLoggedIn !== null && !loading ? children : <div>Chargement...</div>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
