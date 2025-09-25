import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ItemsList from '../pages/ItemsList';
import Search from '../pages/Search';
import ItemCreate from '../pages/ItemCreate';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Reservations from '../pages/Reservations';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import RouteError from '../components/layout/RouteError';
import { useAuthStore } from './store/auth';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container-responsive flex-1 py-6">{children}</main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <RouteError />,
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/items',
    element: (
      <Layout>
        <ItemsList />
      </Layout>
    ),
  },
  {
    path: '/search',
    element: (
      <Layout>
        <Search />
      </Layout>
    ),
  },
  {
    path: '/items/new',
    element: (
      <Layout>
        <ProtectedRoute>
          <ItemCreate />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/reservations',
    element: (
      <Layout>
        <ProtectedRoute>
          <Reservations />
        </ProtectedRoute>
      </Layout>
    ),
  },
]);


