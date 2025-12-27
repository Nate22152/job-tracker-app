import React, { useState } from 'react';
import { loginOrRegister } from '../authorization.js';

export default function Auth({ onAuthSuccess }) {
  // Toggle between login and registration mode
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fname: ''
  });

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginOrRegister(isRegistering, formData);
      onAuthSuccess(user);
    } catch (err) {
      alert(err.message);
    }
  };

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div id="auth-section">
      <h2 id="form-title">{isRegistering ? 'Register' : 'Login'}</h2>
      
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <div className="form-group">
              <input 
                type="text" 
                id="username" 
                placeholder="Username" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                id="fname" 
                placeholder="First Name" 
                onChange={handleChange} 
                required 
              />
            </div>
          </>
        )}

        <div className="form-group">
          <input 
            type="email" 
            id="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            id="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" id="submit-btn">
          {isRegistering ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p>
        <a 
          href="#" 
          id="toggle-link" 
          onClick={(e) => {
            e.preventDefault();
            setIsRegistering(!isRegistering);
          }}
        >
          {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
        </a>
      </p>
    </div>
  );
}