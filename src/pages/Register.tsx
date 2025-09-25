import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

export default function Register() {
  const navigate = useNavigate();
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">Register</h1>
      <RegisterForm onSuccess={() => navigate('/login')} />
      <p className="text-center text-sm">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </section>
  );
}


