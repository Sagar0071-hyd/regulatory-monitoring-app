import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for admin credentials
      if (email === 'Sagar0071@gmail.com' && password === 'Login@321') {
        const token = 'admin-token-' + Math.random().toString(36).substr(2, 9);
        onLogin(token, 'admin');
        toast.success('Admin login successful!');
        navigate('/dashboard');
        setLoading(false);
        return;
      }

      // Try API login for other users
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        onLogin(token, user.role);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      // If API fails, show error
      if (email !== 'Sagar0071@gmail.com') {
        const message = 'Backend API not available. Please deploy backend or use admin credentials.';
        toast.error(message);
      } else {
        const message = err.response?.data?.message || 'Login failed. Please try again.';
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="subtitle">Access your regulatory monitoring dashboard</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password" className="link">
            Forgot Password?
          </Link>
          <span className="separator">•</span>
          <Link to="/register" className="link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
