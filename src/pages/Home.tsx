import { Link } from 'react-router-dom';
import { useAuthStore } from '../app/store/auth';

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="container-responsive py-8">
        <div className="card p-8 max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome{user ? `, ${user.name}` : ''}
            </h1>
            {user && (
              <p className="text-2xl text-gray-600 mb-8">
                120 Points
              </p>
            )}
          </div>

          {/* Colleges Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Colleges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">College of Engineering</h3>
                <p className="text-gray-600 mb-1">8 Points</p>
                <p className="text-sm text-gray-500">Gaza City</p>
              </div>
              <div className="card p-6 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">College of Medicine</h3>
                <p className="text-gray-600 mb-1">12 Points</p>
                <p className="text-sm text-gray-500">Gaza City</p>
              </div>
              <div className="card p-6 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">College of Business</h3>
                <p className="text-gray-600 mb-1">6 Points</p>
                <p className="text-sm text-gray-500">Gaza City</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/items" 
                className="btn-primary px-8 py-3 text-lg font-semibold"
              >
                Browse Items
              </Link>
              <Link 
                to="/search" 
                className="btn-secondary px-8 py-3 text-lg font-semibold"
              >
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">©2026 BookPoints</p>
        </div>
      </div>
    </div>
  );
}




