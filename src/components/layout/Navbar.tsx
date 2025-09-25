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
    <header className="border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="container-responsive flex h-14 items-center justify-between">
        <Link to="/" className="font-semibold">BookPoints</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({ isActive }) => isActive ? 'font-medium' : ''}>Home</NavLink>
          <NavLink to="/items" className={({ isActive }) => isActive ? 'font-medium' : ''}>Items</NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? 'font-medium' : ''}>Search</NavLink>
          {user ? (
            <div className="flex items-center gap-2">
              <NavLink to="/reservations" className={({ isActive }) => isActive ? 'font-medium' : ''}>My Reservations</NavLink>
              <NavLink to="/items/new" className="rounded bg-blue-600 px-3 py-1 text-white">New</NavLink>
              <span className="hidden sm:inline text-gray-600 dark:text-gray-300">{user.name}</span>
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="rounded bg-blue-600 px-3 py-1 text-white">Register</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}


