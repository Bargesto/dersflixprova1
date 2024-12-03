import { Link } from 'react-router-dom';
import { Plus, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { siteName, themeColor } = useSite();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to handle background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-black/70 backdrop-blur-lg shadow-lg' 
          : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm'
        }`}
    >
      <div className="container mx-auto px-2 sm:px-4 py-2 flex items-center justify-between">
        {/* Left section - Logo and Site name */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <img
              src="https://vgaqkrlodqwuwfomcmpl.supabase.co/storage/v1/object/public/dersflix_storage/dersflixlogo.png"
              alt="Logo"
              className="h-10 sm:h-12 object-contain"
            />
            <span className="text-white text-lg sm:text-2xl font-bold text-shadow">
              {siteName}
            </span>
          </Link>
        </div>

        {/* Right section - User actions */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-4">
              <span className="text-white text-shadow hidden md:inline text-sm">
                {user.email}
              </span>
              <Link
                to="/add"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-white/90 rounded-md hover:bg-white transition"
                style={{ color: themeColor }}
                title="Add Video"
              >
                <Plus size={20} />
              </Link>
              <Link
                to="/settings"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-white/90 rounded-md hover:bg-white transition"
                style={{ color: themeColor }}
                title="Settings"
              >
                <Settings size={20} />
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-white px-2 sm:px-3 py-1.5 rounded-md hover:bg-white/10 transition text-sm"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-1.5 text-xs">
              <Link
                to="/login"
                className="bg-white/90 px-2.5 py-1 rounded hover:bg-white transition text-xs"
                style={{ color: themeColor }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white px-2.5 py-1 rounded hover:bg-white/10 transition border border-white/50 hover:border-white text-xs"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;