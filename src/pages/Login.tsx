import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

export default function Login() {
  const navigate = useNavigate();
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <LoginForm onSuccess={() => navigate('/')} />
      <p className="text-center text-sm">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </section>
  );
}


