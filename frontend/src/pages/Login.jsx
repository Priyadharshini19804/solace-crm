import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/solace logo.png'; // ✅ make sure this path is correct

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = /\S+@\S+\.\S+/.test(form.email);
    if (!emailValid) {
      setEmailError('Please enter email correctly');
      return;
    }
    setEmailError('');
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>

      {/* LEFT SIDE */}
      <div
        className="d-flex flex-column justify-content-center px-5"
        style={{ width: '1140px', backgroundColor: '#ffffff' }}
      >
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>

          <h2 className="fw-bold mb-2">Welcome to Alphagnito</h2>
          <p className="text-muted mb-4">Sign in to your account</p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="pill-group mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className={`pill-input ${emailError ? 'error' : ''}`}
                required
              />
              {emailError && <div className="pill-error">{emailError}</div>}
            </div>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="pill-input mb-3"
              required
            />

            {/* Remember + Forgot */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="ms-2 small">
                  Remember me
                </label>
              </div>

              <a href="#" className="small text-decoration-none">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn w-100 text-white"
              style={{
                width: '476px',
                height: '66px',
                backgroundColor: '#1F3C88',
                borderRadius: '50px',
                padding: '10px',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                lineHeight: '28px',
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>

        {/* RIGHT SIDE */}
        <div
        style={{
            position: 'relative',
            width: '698px',
            height: '1000px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >

        {/* Background Panel */}
        <div
            style={{
            position: 'absolute',
            width: '90%',
            height: '95%',
            background: '#0B1530',
            borderRadius: '40px',
            }}
        />

        {/* Blur Glow Effect */}
        <div
            style={{
            position: 'absolute',
            bottom: '0',
            width: '90%',
            height: '40%',
            background: 'rgba(186, 194, 218, 0.3)',
            filter: 'blur(200px)',
            borderRadius: '40px',
            }}
        />

        {/* Logo */}
        <img
            src={logo}
            alt="Solace Logo"
            style={{
            width: '220px',
            height: '220px',
            objectFit: 'contain',
            zIndex: 2,
            }}
        />

        </div>

    </div>
  );
}
