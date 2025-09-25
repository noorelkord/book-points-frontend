import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useAuth';
import { useAuthStore } from '../../app/store/auth';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
    } finally {
      navigate('/');
    }
  };

  return (
    <header className="bg-primary-600 shadow-lg">
      <div className="container-responsive flex h-16 items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl">BookPoints</Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-white font-medium hover:text-primary-100 transition-colors ${isActive ? 'text-primary-100' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/items" 
            className={({ isActive }) => 
              `text-white font-medium hover:text-primary-100 transition-colors ${isActive ? 'text-primary-100' : ''}`
            }
          >
            Pickup Points
          </NavLink>
          <NavLink 
            to="/search" 
            className={({ isActive }) => 
              `text-white font-medium hover:text-primary-100 transition-colors ${isActive ? 'text-primary-100' : ''}`
            }
          >
            Search
          </NavLink>
          {user ? (
            <div className="flex items-center gap-4">
              <NavLink 
                to="/reservations" 
                className={({ isActive }) => 
                  `text-white font-medium hover:text-primary-100 transition-colors ${isActive ? 'text-primary-100' : ''}`
                }
              >
                Reservations
              </NavLink>
              <NavLink 
                to="/items/new" 
                className="bg-white text-primary-600 px-4 py-2 rounded-input font-medium hover:bg-primary-50 transition-colors"
              >
                New Item
              </NavLink>
              <span className="hidden sm:inline text-white text-sm">{user.name}</span>
              <button 
                onClick={handleLogout} 
                className="text-white hover:text-primary-100 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink 
                to="/login" 
                className="text-white font-medium hover:text-primary-100 transition-colors"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="bg-white text-primary-600 px-4 py-2 rounded-input font-medium hover:bg-primary-50 transition-colors"
              >
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}


