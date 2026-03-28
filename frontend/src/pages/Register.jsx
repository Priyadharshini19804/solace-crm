import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import logo from '../assets/solace logo.png';
import './Login.css';

export default function Register() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (
      !form.full_name ||
      !form.email ||
      !form.mobile ||
      !form.password ||
      !form.confirm_password
    )
      return 'All fields are required';
    if (form.password !== form.confirm_password)
      return 'Passwords do not match';
    if (form.mobile.length < 10)
      return 'Mobile number must be at least 10 digits';
    if (form.password.length < 6)
      return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);
    setError('');
    try {
      await API.post('/auth/register', form);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-box">
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Join Solace CRM — it&apos;s free</p>

          {error && (
            <div
              style={{
                color: '#b3261e',
                background: 'rgba(179, 38, 30, 0.08)',
                borderRadius: 12,
                padding: '10px 12px',
                fontSize: 14,
                marginBottom: 12,
                textAlign: 'left'
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: '#0f5132',
                background: 'rgba(14, 107, 62, 0.12)',
                borderRadius: 12,
                padding: '10px 12px',
                fontSize: 14,
                marginBottom: 12,
                textAlign: 'left'
              }}
            >
              {success}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label className="login-label" htmlFor="full_name">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="John Doe"
                value={form.full_name}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>

            <div>
              <label className="login-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>

            <div>
              <label className="login-label" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="9876543210"
                value={form.mobile}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>

            <div>
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>

            <div>
              <label className="login-label" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Re-enter password"
                value={form.confirm_password}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Register
            </button>
          </form>

          <p style={{ marginTop: 20, fontSize: 14, color: '#555' }}>
            Already have an account?{' '}
            <Link to="/login" className="link-button" style={{ fontSize: 14 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-hero">
          <img src={logo} alt="Solace logo" className="login-logo" />
        </div>
      </div>
    </div>
  );
}
