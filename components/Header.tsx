'use client';

import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiMenu, HiX, HiOutlineBell } from 'react-icons/hi';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn, triggerAuthUpdate, loading } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setIsLoggedIn(false);
        triggerAuthUpdate();
        router.push('/');
      } else {
        console.error('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-lg shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
       {/* Logo */}
<Link href="/" className="flex items-center">
  <img
    src="/logo.png"
    alt="Digital Pro Learning"
    className="
      h-28 md:h-36   /* logo très agrandi pour mobile et desktop */
      w-auto
      object-contain
      rounded-full
      transition-transform duration-300
      hover:scale-105
    "
  />
</Link>


          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {['/', '/about', '/services', '/portfolio', '/contact'].map((path, idx) => {
              const labels = ['Accueil', 'À propos', 'Nos services', 'Nos réalisations', 'Contact'];
              return (
                <Link
                  key={idx}
                  href={path}
                  className="text-gray-700 hover:text-[#e8b900] font-medium transition-transform duration-300 hover:scale-105"
                >
                  {labels[idx]}
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-[#e8b900] font-medium transition-transform duration-300 hover:scale-105"
                >
                  Déconnexion
                </button>
                <Link
                  href="/order-list"
                  className="bg-[#e8b900] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-2"
                >
                  <HiOutlineBell className="animate-bounce" />
                  <span>Mes Commandes</span>
                  <span className="bg-red-600 text-white rounded-full text-xs px-2 -ml-1">
                    1
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#e8b900] font-medium transition-transform duration-300 hover:scale-105"
                >
                  Se connecter
                </Link>
                <Link
                  href="/register"
                  className="bg-[#e8b900] text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
              {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-2 p-4">
            {['/', '/about', '/services', '/portfolio', '/contact'].map((path, idx) => {
              const labels = ['Accueil', 'À propos', 'Nos services', 'Nos réalisations', 'Contact'];
              return (
                <Link
                  key={idx}
                  href={path}
                  className="text-gray-700 hover:text-[#e8b900] font-medium transition-transform duration-300 hover:scale-105"
                >
                  {labels[idx]}
                </Link>
              );
            })}

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-[#e8b900] font-medium mt-2 text-left transition-transform duration-300 hover:scale-105"
                >
                  Déconnexion
                </button>
                <Link
                  href="/order-list"
                  className="bg-[#e8b900] text-white px-3 py-1 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 mt-2 w-max text-left flex items-center space-x-2"
                >
                  <HiOutlineBell className="animate-bounce" />
                  <span>Mes Commandes</span>
                  <span className="bg-red-600 text-white rounded-full text-xs px-1.5 -ml-1">
                    1
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#e8b900] font-medium mt-2 transition-transform duration-300 hover:scale-105"
                >
                  Se connecter
                </Link>
                <Link
                  href="/register"
                  className="bg-[#e8b900] text-white px-3 py-1 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 mt-2 w-max text-left"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
